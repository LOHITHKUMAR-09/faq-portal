const streamifier = require('streamifier');
const cloudinary = require('../config/cloudinary');
const AppError = require('../utils/AppError');

const uploadAvatar = (req, res, next) => {
  if (!req.file) return next(new AppError('No file uploaded', 400));

  // Check if cloudinary is configured
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    return next(new AppError('Cloudinary is not configured. File uploads are disabled.', 503));
  }

  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: 'faq-portal/avatars',
      width: 256,
      height: 256,
      crop: 'fill',
      gravity: 'face',
      format: 'jpg',
    },
    (err, result) => {
      if (err || !result) return next(new AppError('Cloudinary upload failed', 500));
      res.json({ success: true, url: result.secure_url });
    }
  );

  streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
};

module.exports = { uploadAvatar };