import json
import requests
import ollama

MCP_URL = "http://127.0.0.1:8082/mcp"
SESSION_ID = None

system = """
You are a local assistant connected to MCP tools.

When the user asks for something that can be solved with a local MCP tool, you MUST call the appropriate tool instead of answering from general knowledge.

Rules:
1. Use the exact tool name exposed by the MCP server.
2. Provide arguments as valid JSON.
3. Prefer a structured tool-call output.
4. If the tool name or arguments are unclear, ask for clarification rather than inventing them.
5. Do not describe the tool call in natural language when a tool call is required.

Expected output format when calling a tool:
{
  "tool_calls": [
    {
      "id": "call_1",
      "type": "function",
      "function": {
        "name": "<tool_name>",
        "arguments": "{\"arg1\": value1, \"arg2\": value2}"
      }
    }
  ]
}

Available local MCP tools in this workspace:
- addition_tool
- subtraction_tool
- multiply_tool
- division_tool

Example:
User: "What is 7 + 3?"
Output:
{
  "tool_calls": [
    {
      "id": "call_1",
      "type": "function",
      "function": {
        "name": "addition_tool",
        "arguments": "{\"a\": 7, \"b\": 3}"
      }
    }
  ]
}
"""

def mcp_post(payload):
    global SESSION_ID

    headers = {
        "Content-Type": "application/json",
        "Accept": "application/json, text/event-stream",
    }
    if SESSION_ID:
        headers["mcp-session-id"] = SESSION_ID

    response = requests.post(MCP_URL, json=payload, headers=headers, timeout=10)

    if response.headers.get("mcp-session-id"):
        SESSION_ID = response.headers["mcp-session-id"]

    if response.status_code >= 400:
        print("MCP error:", response.status_code)
        print(response.text)

    response.raise_for_status()

    if not response.text:
        return {}
    try:
        return response.json()
    except ValueError:
        return {"raw": response.text}


def init_mcp():
    mcp_post({
        "jsonrpc": "2.0",
        "id": 1,
        "method": "initialize",
        "params": {
            "protocolVersion": "2024-11-05",
            "capabilities": {},
            "clientInfo": {"name": "ollama-bridge", "version": "1.0"}
        }
    })
    mcp_post({
        "jsonrpc": "2.0",
        "method": "notifications/initialized",
        "params": {}
    })
    return mcp_post({
        "jsonrpc": "2.0",
        "id": 2,
        "method": "tools/list",
        "params": {}
    })


def ask_ollama(prompt):
    resp = ollama.chat(
        model="qwen3.5:0.8b",
        messages=[
            {"role": "system", "content": system},
            {"role": "user", "content": prompt}
        ]
    )
    return resp["message"]["content"]


def parse_tool_call(model_output):
    text = (model_output or "").strip()
    if not text:
        return None

    try:
        parsed = json.loads(text)
    except json.JSONDecodeError:
        try:
            start = text.index("{")
            end = text.rindex("}") + 1
            parsed = json.loads(text[start:end])
        except ValueError:
            return None

    if isinstance(parsed, dict) and "tool_calls" in parsed:
        tool_call = parsed["tool_calls"][0]
        if isinstance(tool_call, dict):
            func = tool_call.get("function", {})
            name = func.get("name")
            args_text = func.get("arguments", "")
            if isinstance(args_text, str):
                try:
                    args = json.loads(args_text)
                except json.JSONDecodeError:
                    args = {"raw": args_text}
            else:
                args = args_text
            return {"name": name, "arguments": args}

    if isinstance(parsed, dict) and "name" in parsed:
        return parsed

    return None


def call_tool(tool_name, arguments):
    return mcp_post({
        "jsonrpc": "2.0",
        "id": 3,
        "method": "tools/call",
        "params": {
            "name": tool_name,
            "arguments": arguments
        }
    })


if __name__ == "__main__":
    init_mcp()

    prompt = 'Add 5 and 8'

    model_output = ask_ollama(prompt)
    print("Ollama output:", model_output)

    parsed = parse_tool_call(model_output)
    if not parsed:
        print("No valid tool call returned by Ollama")
        raise SystemExit(1)

    result = call_tool(parsed["name"], parsed["arguments"])
    print("MCP result:", result)