// index.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const http = require('http');
const socketio = require('socket.io');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const uploadRoutes = require('./routes/uploadRoutes');



const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const homeRoutes = require('./routes/homeRoutes');
const shopRoutes = require('./routes/shopRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes'); // New dashboard routes
const errorHandler = require('./middleware/errorHandler');
const logger = require('./config/logger'); // Winston logger

// Re-add Swagger dependencies
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerOptions = require('./swaggerOptions'); // our Swagger options file

// Generate Swagger docs
const swaggerDocs = swaggerJsDoc(swaggerOptions);

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Swagger documentation route (accessible at /api-docs)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Security and Middleware Setup
app.use(helmet());
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later."
}));
app.use(morgan('combined', {
  stream: { write: (message) => logger.info(message.trim()) }
}));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// Mount Routes
app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/shop', shopRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api', uploadRoutes);
app.use('/api', shopRoutes); // This makes `/api/allorders` work

// Global Error Handler
app.use(errorHandler);

// Socket.IO for real-time events (optional)
const server = http.createServer(app);
const io = socketio(server, { cors: { origin: '*' } });
io.on('connection', (socket) => {
  logger.info(`New client connected: ${socket.id}`);
  socket.on('chatMessage', (msgData) => io.emit('chatMessage', msgData));
  socket.on('plantUpdated', (data) => io.emit('plantUpdated', data));
  socket.on('disconnect', () => logger.info(`Client disconnected: ${socket.id}`));
});

// Connect to Database and Start Server
sequelize.sync()
  .then(() => {
    logger.info("Database connected and synced");
    server.listen(PORT, () => {
      logger.info(` Server running on http://localhost:${PORT}`);
      logger.info(` API documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch(err => logger.error("Database connection failed:", err));
