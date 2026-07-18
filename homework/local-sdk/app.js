/* The Complete Loop
User -> Your agent -> Http POST (ollama) -> LLM Response: Normal answer (show user), Tool request[-> Run terminal command -> Capture stdout/stderr -> Send output back to ollama -> LLM decides next step]

The idea is a backend sitting between the LLM and the terminal
*/

// Step 1: Run your local LLM
// POST http://lcoalhost:11434/api/chat

// Step 2: Give the model a terminal tool 
/*
import { exec } from "child_process"
function runCommand(command) {
  return new Promise((resolve) => {
      exec(command,(err, stdout, stderr) => {
        resolve({
          stdout, 
          stderr,
          error: err?.message
        })
      })
    })
}
*/
// Step 3: Expose it as a tool
/*
{
  type: "function",
  function: {
    name: "run_terminal",
    description: "Run shell commands",
    parameters: {
      type: "object",
      properties: {
        command: {
          type: "string"
        }
      }
    }
  }
}
Then when llm responds with
{
  "name": "run_terminal",
  "arguments": {
    "command": "npm test"
  }
}
The program executes 'npm test'
and collects 'FAIL ...'

{
  "model": "llama3.1:8b",
  "messages": [
    {
      "role": "user",
      "content": "List the files in the current directory"
    }
  ],
  "stream": false
}
*/
const response = await fetch("http://localhost:11434/api/chat", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        model: "llama3.1:8b",
        messages,
        stream: false
    })
});

const data = await response.json()

import { exec } from "child_process"
exec(reply.command, (err, stdout, stderr) => {
    // Send stdout/stderr back to the model
})

/*
[
  {
    "role": "user",
    "content": "Fix my project."
  },
  {
    "role": "assistant",
    "content": "{'tool':'terminal', 'command': 'npm test'}"
  },
  {
    "role": "tool",
    "content": "Error: Cannot find module express"
  }
]
*/

// Step 4: Continue the conversation
// ...
// Step 5: Add more tools
/* Common tools:
run_terminal(command)
read_file(path)
write_file(path, content)
list_directory(path)
search_files(query)
grep(pattern)
git_status()
git_diff()
git_commit()
*/