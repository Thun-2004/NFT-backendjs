import express from 'express'; 
import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express"; 
import userRouter from "./routes/user.js";


const app = express(); 

//MIDDLEWARE
app.use(express.json());

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
 *   name: Users, NFTs
 *   
 * ]
 */

const swaggerOptions = {
    definition: {
        openapi: "3.0.0", 
        info: {
            title: "Express API with Swagger", 
            version: "1.0.0", 
            description: "Test Express"
        }, 
        servers: [
            {
                url: "http://localhost:3000"
            }
        ]
    }, 
    apis: ['./src/swagger/*.js']
}


const swaggerSpecs = swaggerJsdoc(swaggerOptions); 

//Route
app.use("/user", userRouter); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

export default app; 

