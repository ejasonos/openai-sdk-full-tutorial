# Linraries
from fastmcp import FastMCP 

mcp = FastMCP(name='Calculator')

# Addition tool
mcp.tool()
def add(a: float, b: float):
    '''Add the two parameters
    args: a(float): The first parameter
          b(float): The second parameter
    return a+b: the sum of the two parameters
    '''
    return a+b

# Subtraction tool
mcp.tool()
def subtract(a: float, b: float):
    '''Subtract parameter b from a
    args: a(float): The first parameter
          b(float): The second parameter
    return a+b: the subtraction of parameter b from parameter a
    '''
    return a-b

mcp.tool()
def multiply(a: float, b: float) -> float:
    '''Multiply two numbers
    args: a (float): The first number
          b (float): The second number
    returns: float: the product of the two numbers
    '''
    return a*b

# Division tool
mcp.tool()
def divide(a: float, b: float) -> float:
    '''Divide two numbers
    args: a (float): The first number
          b (float): The second number
    returns: float: the division of the two numbers
    '''
    return a/b