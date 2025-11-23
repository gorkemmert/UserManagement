import jwt from "jsonwebtoken";
export const auth = ( req, res, next) => {
    const authRequest =
    req.headers['authorization'] ||
    req.body.Authorization ||
    req.body.authorization ||
    req.query.Authorization ||
    req.query.authorization ||
    req.tempAuthorization;

    let token = "";
    if(authRequest){
        token = authRequest.split(' ')[1];

    }
    if(token){
        jwt.verify(token, process.env.SECRET_KEY, {}, (error, decoded)=> {
            if(error){
                res.status(401).json({message: "token expired"})
            }else {
                req.userId = decoded.userId
                next();
            }
        } )
    }else {
        res.status(401).json({message: "no token"})
    }
} 

