import jwt from 'jsonwebtoken';
const jwtAuth = (req, res, next)=>{
    // 1. Read the token.
    const token = req.headers['authorization'];
    console.log(req.headers);
    // 2. if no token, return the error.
    if(!token){
        return res.status(401)
        .json({ success: "false", message: "Unauthorized" });
    }
    // 3. check if token is valid.
    try{
        const payload = jwt.verify(
            token,
            "xRHiqWtq0c"
        );
        req.userID = payload.userID;
        console.log(payload);
    } catch(err){
        // 4. return error.
        console.log(err);
        return res.status(401)
        .json({ success: "false", message: "Unauthorized" });
    }

    // 5. call next middleware.
    next();
};

export default jwtAuth;