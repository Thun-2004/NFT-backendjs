import { PrismaClient } from '@prisma/client';
import { createBucket } from "./user.js"


const prisma = new PrismaClient();

const NFTStatus =  {
    AVAILABLE : "AVAILABLE",
    LISTED : "LISTED",
    AUCTION : "AUCTION",
    SOLD : "SOLD"
}


//payload tags = [1, 2, 5]
export const createNFT = async (user_id, payload) => {
    //check if gas fee > money in account otherwise return error
    //contract_address, token_id, token_url
    //detech if user input valid tag
    //how to create 10 copies of NFT

    const newNFT = await prisma.nFT.create({
        data: {
            name: payload.name,
            price: payload.price,
            status: payload.status,
            creator_id: user_id,
            owner_id: user_id,
            volumn: payload.volumn,
            status: NFTStatus.AVAILABLE,
            tags: {
                connect: payload.tags.map(tag_id => ({ id: tag_id }))
            },

            contract_address: 'temp',
            token_id: 'temp',
            token_url: 'temp'
        }
    })
    return "success"
}

export const getNFTsbyUserId = async (user_id) => {
    const nfts = await prisma.nFT.findMany({
        where: {
            owner_id: parseInt(user_id)
        }
    });
    if(!nfts)
        return null

    return nfts
}

export const getNFTbyId = async (nft_id) => {
    const nft = await prisma.nFT.findUnique({
        where: {
            id: parseInt(nft_id)
        }
    }); 
    if(!nft_id)
        return null
    return nft
}

export const getNFTsbyTagId = async (tag_id) => {
    const nfts = await prisma.nFT.findMany({
        where: {
            tags: {
                some: {
                    id: parseInt(tag_id)
                }
            }
        }
    });
    if(!nfts)
        return null

    return nfts
}

export const getNFTsbyStatus = async (status, user_id) => {
    const nfts = await prisma.nFT.findMany({
        where: {
            status: status,
            owner_id: parseInt(user_id)
        }
    });
    if(!nfts)
        return null

    return nfts
}


export const uploadNFTImg = async (nft_id, img_buffer, img_name) => {
    const gcs_path = await createBucket(img_buffer, img_name);
    const nft = await prisma.nFT.findUnique({
        where: {
            id: parseInt(nft_id)
        }
    })

    if(!nft)
        return 

    const updated_nft = await prisma.nFT.update({
        where: {
            id: parseInt(nft_id)
        },
        data: {
            img_url: gcs_path
        }
    })

    return "success"
}

export const getNFTImg = async (nft_id) => {
    const nft = await prisma.nFT.findUnique({
        where: {
            id: parseInt(nft_id)
        }
    }); 
    if(!nft || !nft.img_url)
        return null

    const encodedImgPath = encodeURI(nft.img_url);
    return encodedImgPath
}

export const updateNFTStatusbyId = async (nft_id, nft_status) => {
    const nft = await prisma.nFT.findUnique({
        where: {
            id: parseInt(nft_id)
        }
    }); 

    if(!nft)
        return "NFT not found"; 

    const updated_nft = await prisma.nFT.update({
        where: {
            id: parseInt(nft_id)
        },
        data: {
            status: nft_status
        }
    }); 
    return "update NFT status success"; 
}
