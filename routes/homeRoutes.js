// routes/home.routes.js
const express = require('express');
const router = express.Router();
const HomeController = require('../controllers/homeController');

router.get('/', HomeController.welcome);
router.get('/about', HomeController.aboutInfo);

module.exports = router;
