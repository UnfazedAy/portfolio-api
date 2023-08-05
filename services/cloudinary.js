// Cloudinary configuration to upload images

import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const uploader = async (file) => {
  try {
    const res = await cloudinary.uploader.upload(file, {
      folder: 'portfolio_images',
      allowed_formats: ['jpg', 'png', 'jpeg', 'JPG', 'PNG', 'JPEG'],
    });
    return res.secure_url;
  } catch (err) {
    console.log(err.message);
  }
};

export default uploader;
