const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const User = require('../models/User');
const Sweet = require('../models/Sweet');
const { generateToken } = require('../config/jwt');

describe('Sweets API Tests', () => {
  let adminToken;
  let userToken;
  let adminId;
  let userId;

  beforeAll(async () => {
    // Connect to test database
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/sweet-shop-test';
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    // Clean up and close connection
    await User.deleteMany({});
    await Sweet.deleteMany({});
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    // Clear data before each test
    await User.deleteMany({});
    await Sweet.deleteMany({});

    // Create admin user
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'password123',
      role: 'admin',
    });
    adminId = admin._id;
    adminToken = generateToken(adminId, 'admin');

    // Create regular user
    const user = await User.create({
      name: 'Regular User',
      email: 'user@example.com',
      password: 'password123',
      role: 'user',
    });
    userId = user._id;
    userToken = generateToken(userId, 'user');
  });

  describe('POST /api/sweets', () => {
    it('should create sweet as admin', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${adminToken}`)
        .send(sweetData)
        .expect(201);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(sweetData.name);
      expect(response.body.data.price).toBe(sweetData.price);
    });

    it('should not create sweet as regular user', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      };

      const response = await request(app)
        .post('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .send(sweetData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });

    it('should not create sweet without authentication', async () => {
      const sweetData = {
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      };

      const response = await request(app)
        .post('/api/sweets')
        .send(sweetData)
        .expect(401);

      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /api/sweets', () => {
    beforeEach(async () => {
      await Sweet.create([
        {
          name: 'Chocolate Bar',
          category: 'Chocolate',
          price: 50,
          quantity: 100,
        },
        {
          name: 'Gummy Bears',
          category: 'Gummies',
          price: 30,
          quantity: 50,
        },
      ]);
    });

    it('should get all sweets', async () => {
      const response = await request(app)
        .get('/api/sweets')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.count).toBe(2);
      expect(response.body.data).toHaveLength(2);
    });

    it('should filter sweets by name', async () => {
      const response = await request(app)
        .get('/api/sweets/search?name=Chocolate')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data[0].name).toContain('Chocolate');
    });

    it('should filter sweets by category', async () => {
      const response = await request(app)
        .get('/api/sweets/search?category=Gummies')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data[0].category).toContain('Gummies');
    });

    it('should filter sweets by price range', async () => {
      const response = await request(app)
        .get('/api/sweets/search?minPrice=40&maxPrice=60')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data[0].price).toBeGreaterThanOrEqual(40);
      expect(response.body.data[0].price).toBeLessThanOrEqual(60);
    });
  });

  describe('PUT /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      });
      sweetId = sweet._id;
    });

    it('should update sweet as admin', async () => {
      const updateData = {
        name: 'Updated Chocolate Bar',
        price: 60,
      };

      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updateData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.name).toBe(updateData.name);
      expect(response.body.data.price).toBe(updateData.price);
    });

    it('should not update sweet as regular user', async () => {
      const updateData = {
        name: 'Updated Chocolate Bar',
        price: 60,
      };

      const response = await request(app)
        .put(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(updateData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('DELETE /api/sweets/:id', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      });
      sweetId = sweet._id;
    });

    it('should delete sweet as admin', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(response.body.success).toBe(true);

      // Verify sweet is deleted
      const deletedSweet = await Sweet.findById(sweetId);
      expect(deletedSweet).toBeNull();
    });

    it('should not delete sweet as regular user', async () => {
      const response = await request(app)
        .delete(`/api/sweets/${sweetId}`)
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });

  describe('POST /api/sweets/:id/purchase', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      });
      sweetId = sweet._id;
    });

    it('should purchase sweet successfully', async () => {
      const purchaseData = {
        quantity: 5,
      };

      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(purchaseData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(95);
    });

    it('should not purchase more than available', async () => {
      const purchaseData = {
        quantity: 150,
      };

      const response = await request(app)
        .post(`/api/sweets/${sweetId}/purchase`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(purchaseData)
        .expect(400);

      expect(response.body.success).toBe(false);
      expect(response.body.message).toContain('Insufficient quantity');
    });
  });

  describe('POST /api/sweets/:id/restock', () => {
    let sweetId;

    beforeEach(async () => {
      const sweet = await Sweet.create({
        name: 'Chocolate Bar',
        category: 'Chocolate',
        price: 50,
        quantity: 100,
      });
      sweetId = sweet._id;
    });

    it('should restock sweet as admin', async () => {
      const restockData = {
        quantity: 50,
      };

      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(restockData)
        .expect(200);

      expect(response.body.success).toBe(true);
      expect(response.body.data.quantity).toBe(150);
    });

    it('should not restock sweet as regular user', async () => {
      const restockData = {
        quantity: 50,
      };

      const response = await request(app)
        .post(`/api/sweets/${sweetId}/restock`)
        .set('Authorization', `Bearer ${userToken}`)
        .send(restockData)
        .expect(403);

      expect(response.body.success).toBe(false);
    });
  });
});

