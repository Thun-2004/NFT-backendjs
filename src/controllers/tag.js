import { PrismaClient } from '@prisma/client'; 

const prisma = new PrismaClient();

export const createTag = async (payload) => {
    const existing_tag = await prisma.tag.findUnique({
        where: {
            name: payload.name,
            role: payload.role
        }
    })
    if(existing_tag)
        return "Tag already exists"

    const new_tag = await prisma.tag.create({
        data: {
            name: payload.name,
            role: payload.role
        }
    })
    return "create tag success"
}

export const getTags = async (nft_id) => {
    const tags = await prisma.tag.findMany({
        where: {
            nfts: {
                some: {
                    id: parseInt(nft_id)
                }
            }
        }
    })
    if(!tags)
        return null

    return tags
}

