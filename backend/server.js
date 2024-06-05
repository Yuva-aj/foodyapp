const express = require('express');
const cors = require('cors');
const { MongoClient } = require('mongodb');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB connection string
const url = process.env.MONGO_URL;

app.use(express.json());
app.use(cors()); // Ensure CORS middleware is correctly configured

// MongoDB connection and setup
let mongoClient;
let database;

async function connectToDatabase() {
  mongoClient = new MongoClient(url);
  await mongoClient.connect();
  console.log('Connected to MongoDB Atlas');
  database = mongoClient.db('foody');
}

async function getAllFoods(database) {
  const collection = database.collection('foods');
  return await collection.find().toArray();
}

async function startServer() {
  try {
    await connectToDatabase();
    console.log('Server started and database connected.');

    app.get('/foods', async (req, res) => {
      try {
        const foods = await getAllFoods(database);
        res.json(foods);
      } catch (err) {
        console.error('Error fetching foods:', err);
        res.status(500).json({ message: 'Error fetching foods' });
      }
    });

    app.listen(port, '0.0.0.0', () => {
      console.log(`Listening to port ${port}`);
    });

  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
