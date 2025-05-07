// controllers/productImageUpload.js
const bucket = require('../config/firebase');

exports.uploadProductImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded" });

    const blob = bucket.file(Date.now() + '-' + req.file.originalname);
    const blobStream = blob.createWriteStream({
      metadata: { contentType: req.file.mimetype }
    });

    blobStream.on('error', err => res.status(500).json({ error: err.message }));
    blobStream.on('finish', async () => {
      const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
      res.status(200).json({ imageUrl: publicUrl });
    });

    blobStream.end(req.file.buffer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
