// models/index.js
const fs = require('fs');
const path = require('path');
const sequelize = require('../config/database');
const db = {};

fs.readdirSync(__dirname)
  .filter(file => file !== path.basename(__filename) && file.endsWith('.js'))
  .forEach(file => {
    const filePath = path.join(__dirname, file);
    const modelDef = require(filePath);
    let model;

    // Check if modelDef is a function and whether it is defined as a class.
    if (typeof modelDef === 'function' && modelDef.toString().trim().startsWith("class ")) {
      // It's a class, so we assume it is already initialized (via Model.init)
      model = modelDef;
    } else if (typeof modelDef === 'function') {
      // It's a function, so we call it to initialize the model.
      model = modelDef(sequelize, require('sequelize').DataTypes);
    } else {
      // Fallback: assign directly.
      model = modelDef;
    }
    db[model.name] = model;
  });

// Call associate if available
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = require('sequelize');

module.exports = db;
