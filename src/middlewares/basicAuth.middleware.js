import UserModel from "../features/user/user.model.js";

const basicAuthorizer = (req, res, next)=>{
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).send("No Authorization Details Found");
    }
    console.log(authHeader);
    const base64Credentials = authHeader.replace('Basic','');
    console.log(base64Credentials);
    const decodedCreds = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    console.log(decodedCreds);
    const creds = decodedCreds.split(':');

    const user = UserModel.getAll().find(u=>u.email==creds[0] && u.password==creds[1]);
    if(user){
        next();
    }
    else {
        return res.status(401)
        .json({ success: "false", message: "Incorrect Credentials" });
    }

} 

export default basicAuthorizer;