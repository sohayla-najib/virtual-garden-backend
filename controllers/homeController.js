// controllers/home.controller.js
exports.welcome = (req, res) => {
    res.send("Welcome to the Virtual Garden Home Page!");
  };
  
  exports.aboutInfo = (req, res) => {
    res.json({
      title: "About Virtual Garden",
      content: "Our mission is to grow a vibrant, interactive community where gardening enthusiasts share tips, experiences, and inspiration."
    });
  };
  