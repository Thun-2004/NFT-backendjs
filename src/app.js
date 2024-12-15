import express from 'express'; 
import swaggerJsdoc from "swagger-jsdoc"; 
import swaggerUi from "swagger-ui-express"; 
import routes from "./routes/index.js"; 

const app = express(); 

//MIDDLEWARE
app.use(express.json());

//Routes
app.use(routes);

// Swagger setup
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
    apis: ['./src/routes/*.js']
}

const swaggerSpecs = swaggerJsdoc(swaggerOptions); 
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs))

//test api
app.get("/", (req, res) => {
    console.log(swaggerSpecs);
    res.status(201).send({
        msg: 'Hello'
    })
})




export default app; 

