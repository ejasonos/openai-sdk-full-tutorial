/*
The aim of this work is to implement alot of principles i've learned e.g: MySQL, Mongodb, Chromadb, OpenAI, etc. packages
// Implementing RAG in Research AI
A workspace:
OpenAI SDK + Research AI
Workstation:
Data sub, motivation and clarity of plan
Goal:
Improve visibility by advertising and building into a mobile app.

In order to run this script successfully:
1. Start the docker chromadb image and bind it to a port: docker run -p 8000:8000 chromadb/chroma
2. Start the mysqld.exe service
3. Connect only first time (sometimes) to the internet in order to prevent huggingface.co errors
4. Start the script: node rag.js
*/
// Create variables for data that will be fetched from MySQL

// Setup the connection
import fs from 'fs/promises'
import path from 'path'
import mysql from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const db = await mysql.createConnection({
    port: 3307,
    user: 'root',
    password: 'Favoure246@',
    database: 'ragdb'
})

// Directory containing your docs
const docsDir = './homework/rag/company-files/';

// Read all files from company-files directory
const files = await fs.readdir(docsDir);

// for (const file of files) {
//     if (file.endsWith('.txt')) {
//         const filePath = path.join(docsDir, file);
//         const content = await fs.readFile(filePath, 'utf-8');
        
//         // Insert into database
//         const [result] = await db.query(
//             'INSERT INTO company (title, content) VALUES (?, ?)',
//             [file, content]
//         );
        
//         console.log(`Inserted ${file}:`, result.insertId);
//     }
// }
// Confirm the documents here in the backend
// console.log(await db.query('SELECT * FROM company'))

// feed into vector database
// Embedding Service:
import { ConvBertForQuestionAnswering, pipeline } from "@xenova/transformers"
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2"
);
async function createEmbedding(text) {
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true
  })
  return Array.from(output.data)
}

// Chroma connection
import { ChromaClient } from 'chromadb'
const chroma = new ChromaClient({
    host: 'localhost',
    port: 8000
})

// console.log(await chroma.heartbeat())
// 1. Retrieve documents from MySQL
const [documents] = await db.query('SELECT id, title, content FROM company')

// 2. Convert buffers to text if needed and create embeddings
const processedDocs = documents.map(doc => ({
    id: doc.id.toString(),
    title: doc.title,
    content: Buffer.isBuffer(doc.content) ? doc.content.toString('utf-8') : doc.content
}))

// console.log('Retrieved documents:', processedDocs.length)

// 3. Create/get Chroma collection
// await chroma.createCollection({
//     name: "company",
//     embeddingFunction: createEmbedding
// })
const collection = await chroma.getCollection({
  name: "company",
  embeddingFunction: createEmbedding
})

// 4. For each document, create embeddings and add to Chroma
for (const doc of processedDocs) {
    // Generate embedding using OpenAI
    await collection.add({
        ids: [doc.id],
        embeddings: [await createEmbedding(doc.content)],
        documents: [doc.content],
        metadatas: [{ title: doc.title }]
    })
    console.log(`Added to Chroma: ${doc.title}`)
}

// 5. Perform vector search
const prompt = 'What e-commerce platforms do we partner with and when was the company founded or who is it"s founder'
const queryEmbedding = await createEmbedding(prompt)

const results = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 3
})

// console.log('Search results:', results.documents)

await db.end()

// Setup model connection
import { OpenAI } from 'openai'
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    baseURL: process.env.OPENAI_BASE_URL
})

// feed indexed data for context into model
const stream = await openai.chat.completions.create({
    model: 'llama3.1:8b',
    messages: [
        {role: "system", content: "You are Mall Titan E-commerce assistant that answers user questions based on the context provided, else return 'I'm an E-commerce assistant. What else can I help you with'. Context: "+results.documents},
        {role: "user", content: prompt}
    ],
    stream: true
})

// format model response
for await (const chunk of stream) {
    const delta = chunk.choices[0].delta.content
    if (delta) {
        process.stdout.write(delta)
    }
}

// console.log('Model response:', response.choices[0].message.content)