# HTTP
from fastapi import FastAPI

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

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='localhost', port=8082)