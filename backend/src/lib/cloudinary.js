import {v2 as cloudinary} from 'cloudinary'

import { config } from 'dotenv'

config()

cloudinary.config({
    cloud_name: process.env.cloudinary_cloud_name,
    api_keys: process.env.cloudinary_api_keys,
    api_secret : process.env.cloudinary_api_secret
});

export default cloudinary; 