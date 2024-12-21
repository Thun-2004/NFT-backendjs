import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../utils/password.js'
import { storage, bucketName } from "../utils/gcs.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient(); 

export const registerUser = async (payload) => {
    const existing_user = await prisma.user.findUnique({
        where: {
            username: payload.username, 
            email: payload.email
        }
    })
     
    if(existing_user)
        return "User already exists"

    const { salt, hashed_pw } = await hashPassword(payload.password);

    const new_user = await prisma.user.create({
        data:{
            email: payload.email, 
            username: payload.username,
            hashed_password: hashed_pw,
            salt: salt,
            total_sales: 0
        }
    })

    return "success"
}

export const loginUser = async (payload) => {
    const user = await prisma.user.findUnique({
        where : {
            username: payload.username
        }
    })

    const passwordMatch = await bcrypt.compare(payload.password, user.hashed_password); 
    if(!passwordMatch){
        return "Invalid password"
    }

    const accessToken = jwt.sign({
        user_id: user.id, 
        username: user.username
    }, process.env.JWT_SECRET_KEY)

    return accessToken
}

//base func to get user data
//select data to be returned
export const getUserById = async (user_id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    })

    if(!user)
        return 

    const user_data = {
        username: user.username,
        email: user.email,
        wallet_address: user.wallet_address,
        bio: user.bio,
        total_sales: user.total_sales
    }
    return user_data
}

export const createBucket = async (buffer, fileName) => {
    try{
        const gcs = storage.bucket(bucketName); 
        const storagepath = `storage_folder/${fileName}`;

        //upload file from buffer
        const blob = gcs.file(storagepath);
        await blob.save(buffer, {
            resumable: false, 
            metadata: {
                contentType: 'auto'
            }
        })
        return `https://storage.googleapis.com/${bucketName}/${storagepath}`;

    }catch(error){
        console.log(error); 
        throw new Error("Failed to upload file to Google Cloud Storage");
    }
}

export const uploadProfileImg = async (user_id, img_buffer, img_name) => {
    const gcs_path = await createBucket(img_buffer, img_name);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    })

    if(!user)
        return 

    const updated_user = await prisma.user.update({
        where: {
            id: parseInt(user_id)
        },
        data: {
            profile_img: gcs_path
        }
    })

    return "success"

}

export const getProfileImg = async (user_id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    }); 
    if(!user || !user.profile_img)
        return null

    const encodedImgPath = encodeURI(user.profile_img);
    return encodedImgPath
}

export const uploadBannerImg = async (user_id, img_buffer, img_name) => {
    const gcs_path = await createBucket(img_buffer, img_name);
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    })

    if(!user)
        return 

    const updated_user = await prisma.user.update({
        where: {
            id: parseInt(user_id)
        },
        data: {
            banner_img: gcs_path
        }
    })

    return "success"
}

export const getBannerImg = async (user_id) => {
    const user = await prisma.user.findUnique({
        where: {
            id: parseInt(user_id)
        }
    }); 
    if(!user || !user.banner_img)
        return null

    const encodedImgPath = encodeURI(user.banner_img);
    return encodedImgPath
}


//bio, profile picture, banner_img