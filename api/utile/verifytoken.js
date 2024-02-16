import jwt from 'jsonwebtoken';
import { errorHandler } from '../utile/errorHandler.js';

export const verifytoken =  (req, res, next) => {
    const token = req.cookies.access_token;

    if (!token) return next(errorHandler(401, 'unauthorized'));

    jwt.verify(token, process.env.JWT_SERVICE, (error, user) => {
        if (error) return next(errorHandler(403, 'forbidden'));

        req.user = user;
        next();
    })

}