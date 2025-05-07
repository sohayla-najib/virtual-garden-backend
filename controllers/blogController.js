// controllers/blog.controller.js
const { Blog, User } = require('../models');

exports.getAllBlogs = async (req, res, next) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ['id', 'title', 'content', 'imageUrl', 'createdAt'], // <-- add imageUrl here
      include: [
        {
          model: User,
          as: 'author',
          attributes: ['id', 'username']
        }
      ],
      order: [['createdAt', 'DESC']]
    });
    res.json(blogs);
  } catch (err) {
    next(err);
  }
};




// controllers/blog.controller.js

exports.getBlogById = async (req, res, next) => {
  try {
    const blog = await Blog.findByPk(req.params.id, {
      attributes: ['id', 'title', 'content', 'imageUrl', 'createdAt'],
      include: [{ model: User, as: 'author', attributes: ['id', 'username'] }],
    });

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    res.json(blog);
  } catch (err) {
    next(err);
  }
};



const path = require('path');
const admin = require('../config/firebase'); // wherever you initialized firebase-admin

const bucket = admin.storage().bucket(); // uses default bucket from initialization

exports.createBlog = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    let imageUrl = null;

    if (req.file) {
      const fileName = Date.now() + '-' + req.file.originalname;
      const file = bucket.file(fileName);

      const stream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        stream.on('error', reject);
        stream.on('finish', async () => {
          try {
            await file.makePublic();
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            resolve();
          } catch (err) {
            reject(err);
          }
        });
        stream.end(req.file.buffer);
      });
    }

    const newBlog = await Blog.create({
      title,
      content,
      imageUrl,
      userId: req.user.id,
    });

    res.status(201).json(newBlog);
  } catch (err) {
    next(err);
  }
};
