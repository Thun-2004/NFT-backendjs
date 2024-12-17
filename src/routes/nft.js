import { Router } from "express"; 
import { checkSchema, validationResult, matchedData } from "express-validator"

const router = Router(); 

router.get("/:nft_id", 
    (req, res) => {
        const nft_id = req.params.nft_id;
        // return nft data
});

router.get("/:nft_id/getImg", 
    (req, res) => {
        const nft_id = req.params.nft_id; 
        // return nft data
});

router.post("/create", 
    (req, res) => {
        // create nft
});

router.post("/upload_img", 
    (req, res) => {
        
});

router.post("/:nft_id/addTag/:tag_id",
    (req, res) => {
        const { nft_id, tag_id } = req.params; 
        // add tag to nft
});

router.put("/update_status/:nft_id/:nft_status", 
    (req, res) => {
        const { nft_id, new_status } = req.params; 
        // update nft status
});

router.patch("/update/:nft_id",
    (req, res) => {
        // update nft data
});

router

export default router; 






