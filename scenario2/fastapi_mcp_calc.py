# HTTP
'''
pip install fastapi fastapi_mcp uvicorn

To run the fastapi you only need
if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8082)

To convert it to mcp in order to test with npx @modelcontextprotocol/inspector, add the following lines of code to the python file.
# 2. Converting it to MCP
mcp = FastApiMCP(app, name='Calculator MCP Converted')
mcp.mount_http()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8082)

Then on the mcp ui, set the 
transport type = Streamable HTTP,
Url = http://localhost:8082/mcp and 
click connect
'''

from fastapi import FastAPI
from fastapi_mcp import FastApiMCP

#1. Let's make a fastapi app
app = FastAPI(
    title='Calculator API'
)

@app.post('/multiply')
def multiply(a: float, b: float):
    '''
    Multiplies two numbers and returns the result.
    '''
    result = a*b
    return {'result': result}

@app.post('/add')
def add(a: float, b: float):
    '''
    Add two numbers and return result
    '''
    result = a+b
    return {'result': result}

@app.post('/subtract')
def subtract(a: float, b: float):
    '''
    Subtracts two numbers and returns the result.
    '''
    result = a-b
    return {'result': result}

@app.post('/divide')
def divide(a: float, b: float):
    '''
    Divides two numbers and return result
    '''
    result = a/b
    return {'result': result}

# 2. Converting it to MCP
mcp = FastApiMCP(app, name='Calculator MCP Converted')
mcp.mount_http()

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8082)
