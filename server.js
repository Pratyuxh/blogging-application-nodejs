// 1. Import express
import express from 'express';
import blogRouter from './src/features/blogging/blogging.routes.js';
import cors from 'cors';
import dotenv from "dotenv";
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};
import loggerMiddleware from './src/middlewares/logger.middleware.js';
import { ApplicationError } from './src/error-handler/applicationError.js';
import {connectToMongoDB} from './src/config/mongodb.js';
// 2. Create Server
const server = express();
dotenv.config();

var corsOptions = {
    origin:'http://localhost:3200'
}

server.use(cors(corsOptions));
server.use(express.json());
server.use(loggerMiddleware);
server.use("/api-docs",  swagger.serve ,swagger.setup(apiDocs))
server.use("/api/blogs", loggerMiddleware, jwtAuth, blogRouter);
server.use("/api", userRouter);

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Blogging APIs");
});

server.use((err, req, res, next) => {
    console.log(err);
    if(err instanceof ApplicationError){
        res.status(err.code).send(err.message);
    }
    res.status(500).send(
        'Something went wrong, please try later'
    );
});

server.use((req, res)=>{
    res.status(404).send("API Not Found")
})
// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
    connectToMongoDB();
});

