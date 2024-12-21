import express from 'express'; 
import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express"; 
import userRouter from "./routes/user.js";
import nftRouter from "./routes/nft.js";
import tagRouter from "./routes/tag.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app = express(); 

//MIDDLEWARE
app.use(express.json());
app.use(cookieParser()); 
// app.use(cors)

// Swagger setup
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first
 *         - last
 *       properties:
 *         id:
 *           type: integer
 *           description: The Auto-generated id of a user
 *         first:
 *           type: string
 *           description: first name
 *         last:
 *           type: string
 *           descripton: last name
 *       example:
 *         id: 1
 *         first: John 
 *         last: Doe
 * 
 * @swagger
 *  tags:[
 *   name: Users, NFTs, Tags
 *   
 * ]
 */

const swaggerOptions = {
    definition: {
        openapi: "3.0.0", 
        securitySchema: {
            bearerAuth: {
                type: "http", 
                scheme: "bearer", 
                bearerFormat: "JWT"
            }
        }, 
        info: {
            title: "Express API with Swagger", 
            version: "1.0.0", 
            description: "Test Express"
        }, 
        servers: [
            {
                url: "http://localhost:3000"
            }
        ], 
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT" 
                }
            }
        }, 
    }, 
    apis: ['./src/swagger/*.js']
}


const swaggerSpecs = swaggerJsdoc(swaggerOptions); 

//Routee
app.use("/user", userRouter); 
app.use("/nft", nftRouter);
app.use("/tag", tagRouter); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

export default app; 

