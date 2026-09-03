# OpenAI SDK Learning Workspace

This repository is a collection of Node.js command-line experiments that build an AI application in stages. It starts with a direct chat completion and gradually adds streaming, conversation memory, function calling, structured output, databases, embeddings, vector search, and retrieval-augmented generation (RAG).

The most complete application is `exam-prep-agent`: a local study assistant that searches a collection of course PDFs and uses the retrieved passages to answer questions about robotics and related engineering material. The other folders are focused lessons and prototypes that explain the pieces used by that agent.

## What the application does

The exam-preparation agent follows this flow:

1. It asks the student for an email address and creates an in-memory user and conversation identity.
2. At startup, it scans `exam-prep-agent/pdf/` for PDF files.
3. It extracts text and PDF metadata with `pdf-parse`.
4. It splits each document into 1,000-character chunks.
5. It converts each chunk into a normalized embedding with the local `Xenova/all-MiniLM-L6-v2` model.
6. It stores the chunks, embeddings, and metadata in a ChromaDB collection named `examPrepAgent`.
7. For every question, it embeds the question and retrieves the five closest chunks using vector similarity.
8. It sends the retrieved context and the conversation messages to an OpenAI-compatible chat-completions endpoint.
9. It streams the model's answer to the terminal and keeps the assistant response in the current runtime conversation.

The default model is `llama3.1:8b`, normally served locally by Ollama. Because the code uses the OpenAI SDK with a configurable `baseURL`, the chat endpoint can be replaced with another OpenAI-compatible provider.

## Repository map

### `exam-prep-agent/`

The end-to-end RAG study assistant.

- `index.js` loads PDFs, creates embeddings, indexes chunks in ChromaDB, retrieves relevant material, and runs the interactive chat loop.
- `pdf/` contains the study corpus, including CPE526 robotics notes, ROS 2 and manipulator material, spatial mathematics, URDF material, course outlines, and midterm papers with solutions.
- `test-scripts/test.js` contains small experiments for UUIDs, terminal input, PDF parsing, and chunking that were used while developing the agent.
- `README.md` contains the shorter project-specific startup notes.
- `DOC-20260810-WA0004/` contains supporting class communication and audio/image material; the current agent indexes PDFs only.

### `lectures/`

The learning path that leads to the agent:

- `l1-chatbot-stream/` demonstrates a basic chat loop and token streaming through `readline`.
- `l2-sessions/` explores runtime conversation history and a MongoDB-backed message store, including user, conversation, and message identifiers.
- `l3-tools-structure/` demonstrates the model-to-tool-to-model loop and structured extraction validated with Zod. Examples include a horoscope function and calendar-event extraction.
- `l4-embed-vector-rag/` demonstrates local embeddings, chunking, MySQL document storage, ChromaDB vector search, cosine similarity, and injecting retrieved context into a chat completion.

### `homework/`

Additional prototypes for the same concepts:

- `tool-call-classwork.js` implements a complete `read_file` function-call round trip.
- `tools-test.js` sketches tools for reading and writing files, shell commands, web search, and file search.
- `ollama-openaisdk.js` is a streaming Ollama chatbot with runtime message history.
- `ev-gpt2-tool-test.js` checks how a local OpenAI-compatible endpoint handles tool definitions.
- `rag/rag.js` connects MySQL documents to a ChromaDB `company` collection and asks an e-commerce assistant to answer from retrieved company information.
- `rag/company-files/` contains the sample Mall Titan company documents used by that RAG prototype.

### Root data and configuration

- `package.json` contains the root scripts and shared dependencies.
- `openai-sdk-rag.sql` defines the sample MySQL `company` table used by the homework RAG experiment.
- `questions` contains DSP examination questions used as study material or test data.
- `.env` is local configuration and is intentionally ignored by Git. Do not commit API keys or database credentials.

## Prerequisites

- Node.js with ES module support.
- Ollama, if using the default local model, with `llama3.1:8b` available.
- Docker, to run ChromaDB.
- A local MySQL server on port `3307` only for the `homework/rag/rag.js` experiment.
- MongoDB only for `lectures/l2-sessions/p1-lecture3.2.js`.
- Internet access may be needed the first time `@xenova/transformers` downloads the embedding model. After that, the model can run locally from its cache.

## Setup

Install the root dependencies:

```bash
npm install
```

Create a root `.env` file. For the default Ollama setup, use an OpenAI-compatible local endpoint:

```env
OPENAI_API_KEY=LEAVE_ANY_STRING_FOR_OLLAMA_LOCAL_MODEL
OPENAI_BASE_URL=http://127.0.0.1:11434/v1
```

Start the services needed by the exam agent in separate terminals:

```bash
ollama run llama3.1:8b
docker run -p 8000:8000 chromadb/chroma:latest
```

Then run the agent from the repository root:

```bash
npm run exam-prep
```

The agent asks for an email, then accepts study questions. Enter `exit` to print the current conversation and close the session.

## Available commands

Run these from the repository root:

| Command | Purpose |
| --- | --- |
| `npm run exam-prep` | Start the PDF-backed exam preparation agent. |
| `npm run exam-prep-test` | Run the development experiments in `exam-prep-agent/test-scripts/test.js`. |
| `npm start` | Run the lecture 4 embedding and RAG demonstration. It requires MySQL and ChromaDB. |
| `npm run rag` | Run the Mall Titan company-document RAG experiment. It requires MySQL, ChromaDB, and a chat endpoint. |

The root `test` script currently points to `homework/toolTest.js`, but that file is not present; the existing file is `homework/tools-test.js`. Treat `npm test` as stale until that script is corrected.

## Technical concepts demonstrated

### Chat and streaming

The earliest examples call `client.chat.completions.create()` with a system/developer instruction and user message. With `stream: true`, the code consumes the asynchronous response and writes each text delta as it arrives, so the user sees an incremental answer rather than waiting for the complete response.

### Runtime and database memory

Some lessons keep messages in a JavaScript array for the life of the process. The MongoDB prototype models users, conversations, and messages separately and stores message IDs, conversation IDs, roles, and content. The current exam agent uses runtime memory only; restarting it rebuilds the vector index and loses the chat history.

### Tools and structured output

Tool calling is implemented as a controlled application loop: the model requests a named function with JSON arguments, the Node.js process executes the function, the result is added as a `tool` message, and a second model call produces the final answer. The structured-output lesson uses a tool call as an extraction mechanism and validates the arguments with a Zod schema.

### Retrieval-augmented generation

The RAG examples keep source documents separate from their vector representations. MySQL is used for original documents and metadata in the company prototype, while ChromaDB stores embeddings and performs nearest-neighbor retrieval. The language model receives the retrieved text, not the embedding vectors themselves. The exam agent follows the same principle with PDFs and local embeddings.

## Current limitations

This is an instructional workspace and several scripts are deliberately experimental rather than production-ready:

- The exam agent creates a new ChromaDB collection at startup, so rerunning it against an existing collection may fail unless the collection is removed or the code is changed to reuse it.
- PDF indexing happens on every startup; there is no incremental indexing, deduplication, or persistent chat history.
- Retrieval uses fixed character chunks rather than semantic chunking and does not yet implement the hybrid keyword-plus-vector search mentioned in the lessons.
- The code assumes local service ports and has limited error handling and input validation.
- Some examples target NVIDIA or Ollama-compatible endpoints through `OPENAI_BASE_URL`; model names and endpoint configuration must match the server being used.

The repository is therefore best understood as a practical progression from SDK fundamentals to a local, document-grounded study agent, not as a single production deployment.
