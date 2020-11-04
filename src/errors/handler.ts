import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup';

interface ValidationErrors {
    [key: string] : string[]
}

const errorHandler:ErrorRequestHandler = (error, request, response, next) => {
    if(error instanceof ValidationError) {
        let erros: ValidationErrors = {};

        error.inner.forEach(err => {
            erros[err.path] = err.errors;
        });

        return response.status(400).json({message: 'Validation fails', erros})
    }
    
    console.log(error.message)
    return response.status(403).json({message: error.message})
}

export default errorHandler;