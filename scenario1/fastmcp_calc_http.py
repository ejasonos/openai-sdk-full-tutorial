'''
To run the fastmcp as STDIO (which is default transport type), just run the python file
python fastmcp_calc.py
To run the fastmcp as HTTP, specify the transport type in the mcp.run() method e.g
if __name__ == '__main__':
    mcp.run(transport='http', host='localhost', port=8082) # STDIO by default

Then run:
python fastmcp_calc_http.py
npx @modelcontextprotocol/inspector python fastmcp_calc_http.py
'''
# Linraries
from fastmcp import FastMCP 

mcp = FastMCP(name='Calculator')

# Addition tool
@mcp.tool(
    name='addition tool',
    description='''Add the two parameters
        args: a(float): The first parameter
              b(float): The second parameter
        return a+b: the sum of the two parameters
        ''')
def add(a: float, b: float):
    '''Add the two parameters
    args: a(float): The first parameter
          b(float): The second parameter
    return a+b: the sum of the two parameters
    '''
    return a+b

# Subtraction tool
@mcp.tool(
    name='subtraction tool',
    description='''Subtract the second parameter from the first
        args: a(float): The first parameter
              b(float): The second parameter
        return a-b: the subtraction of parameter b from parameter a
        ''')
def subtract(a: float, b: float):
    '''Subtract parameter b from a
    args: a(float): The first parameter
          b(float): The second parameter
    return a-b: the subtraction of parameter b from parameter a
    '''
    return a-b

@mcp.tool(
    name='multiply tool',
    description='''Multiply the two parameters
        args: a(float): The first parameter
              b(float): The second parameter
        return a*b: the product of the two parameters
        ''')
def multiply(a: float, b: float) -> float:
    '''Multiply two numbers
    args: a (float): The first number
          b (float): The second number
    returns: float: the product of the two numbers
    '''
    return a*b

# Division tool
@mcp.tool(
    name='division tool',
    description='''Divide the first parameter by the second
        args: a(float): The first parameter
              b(float): The second parameter
        return a/b: the division of the two parameters
        ''')
def divide(a: float, b: float) -> float:
    '''Divide two numbers
    args: a (float): The first number
          b (float): The second number
    returns: float: the division of the two numbers
    '''
    return a/b

if __name__ == '__main__':
    mcp.run(transport='http', host='localhost', port=8082) # STDIO by default