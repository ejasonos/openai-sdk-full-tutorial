// Import all Required Libraries
import OpenAI from "openai";
import readline from "readline";
import { randomUUID } from "crypto";
import dotenv from "dotenv";
dotenv.config();
import fs from "fs";
import path from "path";
import mysql from "mysql2/promise";
import { PDFParse } from "pdf-parse";

// Stage 1: Get Documents -> Embed documents -> Send into vector db
// Create Embedding Service and feed text into vector database
import { ConvBertForQuestionAnswering, pipeline } from "@xenova/transformers";
const extractor = await pipeline(
  "feature-extraction",
  "Xenova/all-MiniLM-L6-v2",
);
export async function createEmbedding(text) {
  const output = await extractor(text, {
    pooling: "mean",
    normalize: true,
  });
  return Array.from(output.data);
}
// Connect chroma and create chroma collection
// Directory: chroma/client.js
import { ChromaClient } from "chromadb";
export const chroma = new ChromaClient({
  host: "localhost",
  port: 8000,
});
// Chromadb collection
// const collection = await chroma.createCollection({
//   name: "examPrepAgent",
//   embeddingFunction: createEmbedding,
// });
// await chroma.deleteCollection({
//   name: "exammPrepAgent"
// })
const collection = await chroma.getCollection({
  name: "examPrepAgent",
  embeddingFunction: createEmbedding,
});

// For each document, create embeddings and add to Chroma
// Directory containing your docs
const docsDir = "./exam-prep-agent/pdf/";
// Read all files from company-files directory
const files = await fs.readdirSync(docsDir);

// for (const file of files) {
//   if (file.endsWith(".pdf")) {
//     const filePath = path.join(docsDir, file);
//     let way = `.\\` + `${filePath}`;
//     let switchSlash = way.replaceAll("\\", "/");
//     console.log(switchSlash);
//     let buffer = fs.readFileSync(switchSlash);
//     const parser = new PDFParse({ data: buffer });
//     const result = await parser.getText();
//     const pdfTextResult = result.text;
//     const pdfTextResultInfo = await parser.getInfo();
//     await parser.destroy();

//     // Define our chunk size
//     const chunk_size = 1000;
//     console.log(
//       `chunck size: ${chunk_size}; pdfTextResult.length: ${pdfTextResult.length}`,
//     );
//     var n = 0;
//     for (let i = 0; i < pdfTextResult.length; i += chunk_size) {
//       console.log(
//         "Processing chunk for file: " +
//           filePath +
//           " +" +
//           `${n}/${pdfTextResult.length / 1000}`,
//       );
//       const chunk = pdfTextResult.slice(
//         i,
//         Math.min(i + chunk_size, pdfTextResult.length),
//       );
//       // Skip empty chunks
//       if (!chunk.trim()) continue;
//       // Generate embedding
//       await collection.add({
//         ids: [`${file}-${i + 1}`],
//         embeddings: [await createEmbedding(chunk)],
//         documents: [chunk],
//         metadatas: [
//           {
//             title: pdfTextResultInfo.info?.Title || "",
//             author: pdfTextResultInfo.info?.Author || "",
//             totalPages: pdfTextResultInfo.info?.total || "",
//           },
//         ],
//       });
//       n += 1;
//     }
//   }
// }

// 5. Perform vector search
async function getVectorResults(prompt) {
  const queryEmbedding = await createEmbedding(prompt);
  const vectorSearchResults = await collection.query({
    queryEmbeddings: [queryEmbedding],
    nResults: 5,
  });
  return vectorSearchResults;
}

// Setup Openai sdk
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL,
});
const model = "llama3.1:8b";

// Create session variables
var user_id = `usr-${randomUUID()}`; // user id is generated any time a user signs up so it can be created outside this script or when this script is run
var conv_id = `conv-${randomUUID()}`; // conversation id is regenerated for every new login so it is generated when this module (file) is run
var message_id = ""; // message id is regenerated for every new message so leave it as an empty string
var tmp_msg = [];
var email = "";
var preventDoubleWelcome = false;

const examPrepAgent = async () => {
  const rl_1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Login with your email: ",
  });

  // START
  await rl_1.prompt();
  await rl_1.on("line", async (line) => {
    email = await line;
    if (email) {
      if (preventDoubleWelcome === false) {
        console.log(`Welcome, ${email}`);
        console.log(`Let's get back to studying.`);
        preventDoubleWelcome = true;
      }
      await agentLoop();
    }
  });

  const userDb = {
    id: user_id,
    email: email,
    conversation: {
      id: conv_id,
      messages: [
        {
          id: "sys_000",
          role: "system",
          content: `You are my Nigerian, University of Benin, Computer Engineering Lecturer. Your name is Engineer Omosigho. And your course is CPE512: Digital Signal Processing. Don't be playful or informal. You answer majorly from the context provided because it is a vector db search through textbooks for the course, however you may simplify the context or just teach the context;`,
        },
      ],
    },
    character: {
      key: "",
      value: "",
    },
  };

  const agentLoop = async () => {
    if (email) {
      const rl_2 = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
        prompt: "User: ",
      });

      await rl_2.prompt();
      rl_2.on("line", async (line) => {
        // check for empty string
        if (line.trim() === "") {
          await console.log(await "AI: Ask something please..");
          rl_2.prompt();
          return;
        }

        const prompt = line;
        // exit session
        if (prompt === "exit") {
          await console.table(await userDb.conversation.messages);
          await rl_2.close();
          return;
        }

        // Create userid and conversation id
        if (user_id.length < 1) {
          user_id = randomBytes(5).join("");
        }
        if (conv_id.length < 1) {
          conv_id = randomBytes(5).join("");
        }

        // Assign the ids to the user object
        userDb.id = user_id;
        userDb.conversation.id = conv_id;
        // Always regenerate a new id for the message id on every loop
        message_id = `msg-${randomUUID()}`;

        // await console.log(
        //   await `user_id: ${user_id}; conv_id: ${conv_id}; message_id: ${message_id}`,
        // );

        const stream = await openai.chat.completions.create({
          model: model,
          messages: [
            { id: message_id, role: "user", content: prompt },
            {
              id: message_id,
              role: "assistant",
              content: `Context: ${await getVectorResults(prompt)}`,
            },
            ...userDb.conversation.messages,
          ],
          stream: true,
        });
        await console.log(await "AI: ");
        for await (let chunk of stream) {
          var delta = chunk.choices[0].delta.content;
          if (delta) {
            await process.stdout.write(delta);
            await tmp_msg.push(delta);
            // console.log(await tmp_msg.join(" "))
          }
        }

        await userDb.conversation.messages.push({
          id: message_id,
          role: "assistant",
          content: tmp_msg.join(" "),
        });

        tmp_msg = await [];
        if (tmp_msg.length < 1) {
          await rl_2.prompt();
        }
      });
    }
  };
};

await examPrepAgent();
/**/
