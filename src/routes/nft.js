import { Router } from "express"; 
import { checkSchema, validationResult, matchedData } from "express-validator"
import { extractUserId } from "../middlewares/auth.js";
import { createNFT, 
        getNFTbyId, 
        getNFTsbyUserId, 
        getNFTsbyTagId, 
        getNFTsbyStatus, 
        uploadNFTImg, 
        getNFTImg, 
        updateNFTStatusbyId
    } from "../controllers/nft.js";

import { upload } from "../utils/fileUpload.js";

const router = Router(); 

router.post("/create", extractUserId,
    async (req, res) => {
       const user_id = req.user_id;
       const result = await createNFT(user_id, req.body);

       if(!result)
           return res.status(400).send("Failed to create NFT");

        return res.status(200).send(result)
});

router.get("/getNFTs/:user_id",
    async (req, res) => {
        const user_id = req.params.user_id;
        const nfts = await getNFTsbyUserId(user_id);

        if(!nfts)
            return res.status(404).send("NFTs not found");
        res.status(200).send(nfts)
        // return nft data
});

router.get("/:nft_id", 
    async (req, res) => {
        const nft_id = req.params.nft_id;
        const nft = await getNFTbyId(nft_id);

        if(!nft)
            return res.status(404).send("NFT not found");
        res.status(200).send(nft)
        // return nft data
});


router.get("/getNFTs/:tag_id", 
    async (req, res) => {
        const tag_id = req.params.tag_id;
        const nfts = await getNFTsbyTagId(tag_id);

        if(!nfts)
            return res.status(404).send("NFTs not found");

        res.status(200).send(nfts); 
    }
);


router.get("/getNFTs/:user_id/:status", 
    async (req, res) => {
        const user_id = req.params.user_id;
        const status = req.params.status;
        const nfts = await getNFTsbyStatus(status, user_id);

        if(!nfts)
            return res.status(404).send("NFTs not found");

        res.status(200).send(nfts); 
    }
);

router.post("/upload_img/:nft_id", upload.single("nftImg"),
    async (req, res) => {
        const nft_id = req.params.nft_id;

        const result = await uploadNFTImg(nft_id, req.file.buffer, req.file.originalname);
        if(!result)
            return res.status(400).send("Upload failed");

        return res.status(200).send({ image_url: result });
});


router.get("/:nft_id/getImg",
    async (req, res) => {
        const nft_id = req.params.nft_id;
        const banner = await getNFTImg(nft_id);
        if(!banner)
            return res.status(404).send("Banner not found");

        return res.status(200).json({ image_url: banner });
});


router.put("/:nft_id/update_status/:nft_status", 
    async (req, res) => {
        const nft_id = req.params.nft_id; 
        const nft_status = req.params.nft_status; 
        const result = await updateNFTStatusbyId(nft_id, nft_status);
        if(!result)
            return res.status(400).send("Failed to update NFT status");

        return res.status(200).send(result);
        // update nft status
});

export default router; 

//get nft by tag_id not return anything
//get tag by nft_id not return anything





