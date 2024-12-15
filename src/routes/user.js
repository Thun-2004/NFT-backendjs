import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { ValidateRegister, ValidateLogin } from "../schemas/userRegister.js"
import { registerUser, loginUser } from "../controllers/user.js"

const router = Router();


router.post("/register", 
    checkSchema(ValidateRegister),
    (req, res) => {
        const data = matchedData(req); 
        const result = validationResult(req);

        if(!result.isEmpty())
            return res.status(400).json({ "errors" : result.array() }); 

        return res.send(registerUser(data)); 
        // return JWT access token 
});

router.post("/login", 
    checkSchema(ValidateLogin),
    (req, res) => {
        const data = matchedData(req); 
        const result = validationResult(req);

        if(!result.isEmpty())
            return res.status(400).json({ "errors" : result.array() }); 

        return res.send(loginUser(data)); 
        // return JWT access token 
});

router.get("/test", 
    (req, res) => {
    console.log("test")
    return res.send({"msg": "test"}); 
    // return JWT access token 
});





export default router; 