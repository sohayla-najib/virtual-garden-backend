// tests/auth.test.js
const request = require('supertest');
const express = require('express');
const { sequelize } = require('../models'); // Ensure your models/index.js exports sequelize
const authRoutes = require('../routes/authRoutes');

const app = express();
app.use(express.json());
app.use('/api/auth', authRoutes);

describe('Auth Endpoints', () => {
  // Before each test, clear the database (force sync drops all tables and recreates them)
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send({
        username: 'jestuser',
        email: 'jestuser@example.com',
        password: 'jestPassword123'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('message');
  });
});

// After all tests, close the database connection
afterAll(async () => {
  await sequelize.close();
});
