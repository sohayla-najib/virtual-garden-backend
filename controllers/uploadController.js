const bucket = require('../config/firebase');
const { v4: uuidv4 } = require('uuid');

exports.uploadProductImage = async (req, res) => {
  if (!req.file) return res.status(400).send("No file uploaded");

  const blob = bucket.file(`products/${Date.now()}_${req.file.originalname}`);
  const blobStream = blob.createWriteStream({
    metadata: {
      contentType: req.file.mimetype,
      metadata: {
        firebaseStorageDownloadTokens: uuidv4()
      }
    }
  });

  blobStream.on('error', (err) => res.status(500).send({ error: err.message }));

  blobStream.on('finish', () => {
    const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
    res.status(200).json({ imageUrl: publicUrl });
  });

  blobStream.end(req.file.buffer);
};
