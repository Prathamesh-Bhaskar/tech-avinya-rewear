const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: '', // Fill in your Cloudinary cloud name
  api_key: '',   // Fill in your Cloudinary API key
  api_secret: '' // Fill in your Cloudinary API secret
});

const uploadToCloudinary = async (filePath) => {
  return cloudinary.uploader.upload(filePath, {
    folder: 'rewear',
    resource_type: 'auto',
  });
};

module.exports = { cloudinary, uploadToCloudinary }; 