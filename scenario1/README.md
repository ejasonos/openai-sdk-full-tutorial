This project contains simple examples of local MCP integration using Python.

The fastmcp_calc_http.py file contains MCP tooling using Python.
It uses an HTTP transport and it works.
To test it, run the Python file and start the MCP server from the VS Code extension menu.

The fastmcp_calc.py file contains MCP tooling using Python.
It uses a stdio transport and it works.
To test it, run the Python file and start the MCP server from the VS Code extension menu.

The python-bridge.py file acts as a bridge between the model and the MCP server.
It provides the correct output format for the model to trigger a tool call and receive a response from the MCP server.
It then receives the response from the MCP server after the action has been performed.