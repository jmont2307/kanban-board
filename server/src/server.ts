const forceDatabaseRefresh = false;

import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import routes from './routes/index.js';
import { sequelize } from './models/index.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// CORS handling for development and production
app.use((req, res, next): void => {
  // Allow specific origins or all in development
  const allowedOrigins = process.env.NODE_ENV === 'production' 
    ? [process.env.CLIENT_URL || ''] 
    : ['http://localhost:5173'];
  
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  
  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
    return;
  }
  
  next();
});

// Serve static files from the client's dist folder
console.log('Static file path:', path.join(__dirname, '../../client/dist'));
app.use(express.static(path.join(__dirname, '../../client/dist')));

app.use(express.json());
app.use(routes);

// For any other request, serve the React app
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
});

// Function to seed the database with default data
const seedDatabase = async () => {
  try {
    const { User, Ticket } = await import('./models/index.js');
    
    // Create default users if they don't exist
    const users = await User.findAll({});
    if (users.length === 0) {
      console.log('Seeding users...');
      await User.bulkCreate([
        { username: 'JollyGuru', password: 'password' },
        { username: 'SunnyScribe', password: 'password' },
        { username: 'RadiantComet', password: 'password' },
      ], { individualHooks: true });
      console.log('Users seeded successfully');
    }

    // Create default tickets if they don't exist
    const tickets = await Ticket.findAll({});
    if (tickets.length === 0) {
      console.log('Seeding tickets...');
      await Ticket.bulkCreate([
        { name: 'Design landing page', status: 'In Progress', description: 'Create wireframes and mockups for the landing page.', assignedUserId: 1 },
        { name: 'Set up project repository', status: 'Done', description: 'Create a new repository on GitHub and initialize it with a README file.', assignedUserId: 2 },
        { name: 'Implement authentication', status: 'Todo', description: 'Set up user authentication using JWT tokens.', assignedUserId: 1 },
        { name: 'Test the API', status: 'Todo', description: 'Test the API using Insomnia.', assignedUserId: 1 },
        { name: 'Deploy to production', status: 'Todo', description: 'Deploy the application to Render.', assignedUserId: 2 },
      ]);
      console.log('Tickets seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding database:', error);
  }
};

// Sync database and start server
sequelize.sync({force: forceDatabaseRefresh}).then(async () => {
  // Seed the database with default data
  await seedDatabase();
  
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});
