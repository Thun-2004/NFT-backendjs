
import { Storage } from '@google-cloud/storage';

export const storage = new Storage({
    keyFilename: process.env.KEYFILENAME
}); 

export const bucketName = process.env.BUCKET_NAME;

