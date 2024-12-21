import { Router } from "express"
import { checkSchema, validationResult, matchedData } from "express-validator"
import { getTags, createTag, getTagsById } from "../controllers/tag.js"

const router = Router(); 

//get all tags
router.post("/createTag", 
    async (req, res) => {
        const result = await createTag(req.body); 
        if(!result)
            return res.status(400).send("Failed to create tag");
        return res.status(200).send(result);
});

//get tags from nft id
router.get("/getTags/:nft_id",
    async (req, res) => {
        const nft_id  = req.params.nft_id;
        const result = await getTags(nft_id);
        if(!result)
            return res.status(404).send("Tags not found");

        return res.status(200).send(result);
        // remove tag from nft
});

router.get("/:tag_id",
    async (req, res) => {
        const tag_id = req.params.tag_id;
        const result = await getTagsById(tag_id);
        if(!result)
            return res.status(404).send("Tag not found");
        return res.status(200).send(result);
});



export default router;



//set up CORS, 
