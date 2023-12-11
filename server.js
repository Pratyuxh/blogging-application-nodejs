// 1. Import express
import express from 'express';
import cartRouter from './src/features/cartItems/cartItems.routes.js';
import cors from 'cors';
// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import userRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import swagger from 'swagger-ui-express';
import apiDocs from './swagger.json' assert {type:'json'};
import { serve } from 'swagger-ui-express';
import loggerMiddleware from './src/middlewares/logger.middleware.js';
// 2. Create Server
const server = express();

var corsOptions = {
    origin:'http://localhost:3200'
}

server.use(cors(corsOptions));

// server.use((req, res, next)=>{
//     res.header('Access-Control-Allow-Origin', 'http://localhost:3200');
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     if (req.method=="OPTIONS"){
//         return res.sendStatus(200);
//     }
//     next();
// })

server.use(express.json());
// server.use(bodyParser.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use(loggerMiddleware);
server.use("/api-docs",  swagger.serve ,swagger.setup(apiDocs))
server.use("/api/products", jwtAuth, productRouter);
server.use("/api/cartItems", jwtAuth, cartRouter)
server.use("/api/users", userRouter);

// 3. Default request handler
server.get('/', (req, res)=>{
    res.send("Welcome to Ecommerce APIs");
});

server.use((req, res)=>{
    res.status(404).send("API Not Found")
})
// 4. Specify port.
server.listen(3200,()=>{
    console.log("Server is running at 3200");
});

