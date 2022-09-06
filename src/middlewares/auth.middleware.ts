import { Request, Response, NextFunction } from 'express'
import jwt, { decode } from 'jsonwebtoken'
import 'dotenv/config'
import { AppError } from '../errors/appError'


const authMiddlewares = async(req: Request, res: Response, next: NextFunction) => {

    let token = req.headers.authorization

    if (!token) {
        throw new AppError(401,'Invalid token')  
    }

    token = token.split(' ')[1]

    jwt.verify(token, process.env.SECRET_KEY as string, (error: any, decoded: any) => {
        if(error){
            throw new AppError(401,'Invalid token')
        }

        
        req.body['isAdm'] = decoded.isAdm,
        req.body['id'] = decoded.sub
        
        next()

    })

}

export default  authMiddlewares