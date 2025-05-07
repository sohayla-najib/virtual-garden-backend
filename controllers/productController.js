const { Product, Category } = require('../models');

exports.getAllProducts = async (req, res, next) => {
  try {
    const categoryId = req.query.category;
    const whereClause = categoryId ? { categoryId } : {};

    const products = await Product.findAll({
      where: whereClause,
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });

    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll({ attributes: ['id', 'name'] });
    res.status(200).json(categories);
  } catch (err) {
    next(err);
  }
};

const admin = require('../config/firebase');
const bucket = admin.storage().bucket();

exports.createProductWithImage = async (req, res) => {
  try {
    const { name, price, categoryId, description, stock } = req.body;

    let imageUrl = null;

    if (req.file) {
      const fileName = Date.now() + '-' + req.file.originalname;
      const file = bucket.file(fileName);

      const blobStream = file.createWriteStream({
        metadata: {
          contentType: req.file.mimetype,
        },
      });

      await new Promise((resolve, reject) => {
        blobStream.on('error', (err) => {
          console.error('Upload error:', err);
          reject(err);
        });

        blobStream.on('finish', async () => {
          try {
            await file.makePublic(); 
            imageUrl = `https://storage.googleapis.com/${bucket.name}/${file.name}`;
            resolve();
          } catch (err) {
            reject(err);
          }
        });

        blobStream.end(req.file.buffer);
      });
    }

    const newProduct = await Product.create({
      name,
      price,
      description,
      stock,
      categoryId,
      imageUrl, // Save the Firebase image URL here
    });

    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};