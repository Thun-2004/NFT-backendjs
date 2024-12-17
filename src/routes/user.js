import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { ValidateRegister, ValidateLogin } from "../schemas/userRegister.js"
import { registerUser, 
        loginUser, 
        getUserById, 
        getNFTsbyUserId, 
        uploadProfileImg, 
        getProfileImg } from "../controllers/user.js"
import { extractUserId } from "../middlewares/auth.js"
import { upload } from "../utils/fileUpload.js"

const router = Router();

router.post("/register",
    checkSchema(ValidateRegister),
    async (req, res) => {
        const data = matchedData(req); 
        const result = validationResult(req);

        if(!result.isEmpty())
            return res.status(400).json({ "errors" : result.array() }); 

        const output = await registerUser(data); 
        console.log(output)
        return res.send({msg: output}); 
        // return JWT access token 
});

router.post("/login",
    checkSchema(ValidateLogin),
    async (req, res) => {
        const data = matchedData(req); 
        const result = validationResult(req);

        if(!result.isEmpty())
            return res.status(400).json({ "errors" : result.array() }); 

        const JWT_token = await loginUser(data);
        res.cookie("access_token", JWT_token, 
                {
                    httpOnly: false, 
                    secure: false, 
                    sameSite: "none", 
                    expire: new Date() + 36000
                });
        return res.send({ "JWT_token" : JWT_token }); 
});

router.get("/me",
    extractUserId, 
    async (req, res) => {
        const user_id = req.user_id;
        const user = await getUserById(user_id);
        if(!user)
            return res.status(404).send("User not found");
        return res.status(200).send(user); 
});

router.get("/:id", 
    extractUserId,
    async (req, res) => {
        const user_id = req.params.id;
        const user = await getUserById(user_id);
        if(!user)
            return res.status(404).send("User not found");
        return res.status(200).send(user); 
        // return seller data
});

router.patch("/update_profile",
    extractUserId, 
    (req, res) => {
        const user_id = req.user_id;
        return res.send(getNFTsbyUserId(user_id));
        // return seller data
});

router.post("/upload_profile", extractUserId, upload.single("userProfile"),//same as form name 
    async (req, res) => {
        const user_id = req.user_id;
        const profile = await uploadProfileImg(user_id, req.file.buffer, req.file.originalname);

        if(!profile)
            return res.status(400).send("Upload failed");

        return res.redirect(profile); 
        // return res.status(200).send({ msg: profile });
});

router.get("/:id/getProfileImg", 
    async (req, res) => {
        const user_id = req.params.id;
        const profile = await getProfileImg(user_id);
        if(!profile)
            return res.status(404).send("Profile not found");

        return res.status(200).json({ image_url: profile });
});

router.post("/upload_banner", 
    (req, res) => {
     
});


router.get("/:id/getBannerImg", 
    (req, res) => {
        
});

router.get("/:id/NFTs", 
    (req, res) => {
        const user_id = req.params.id; 
        return res.send(getNFTsbyUserId(user_id)); 
        // return seller data
});


export default router; 