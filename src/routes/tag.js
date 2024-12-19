import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { getTags, createTag } from "../controllers/tag.js"

const router = Router(); 

//get all tags
router.post("/createTag", 
    (req, res) => {
        const result = createTag(req.body); 
        if(!result)
            return res.status(400).send("Failed to create tag");
        return res.status(200).send(result);
});

//get tags from nft id
router.get("/getTags/:nft_id",
    (req, res) => {
        const nft_id  = req.params.nft_id;
        const result = getTags(nft_id);
        if(!result)
            return res.status(404).send("Tags not found");

        return res.status(200).send(result);
        // remove tag from nft
});


export default router;


