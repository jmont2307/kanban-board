-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL,
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create tickets table if it doesn't exist
CREATE TABLE IF NOT EXISTS tickets (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  "assignedUserId" INTEGER REFERENCES users(id),
  "createdAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Insert seed users if they don't exist
INSERT INTO users (username, password, "createdAt", "updatedAt")
VALUES 
  ('JollyGuru', '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', NOW(), NOW()),
  ('SunnyScribe', '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', NOW(), NOW()),
  ('RadiantComet', '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', NOW(), NOW())
ON CONFLICT (username) DO NOTHING;

-- Insert sample tickets if they don't exist
INSERT INTO tickets (name, status, description, "assignedUserId", "createdAt", "updatedAt")
VALUES
  ('Design landing page', 'In Progress', 'Create wireframes and mockups for the landing page.', 1, NOW(), NOW()),
  ('Set up project repository', 'Done', 'Create a new repository on GitHub and initialize it with a README file.', 2, NOW(), NOW()),
  ('Implement authentication', 'Todo', 'Set up user authentication using JWT tokens.', 1, NOW(), NOW()),
  ('Test the API', 'Todo', 'Test the API using Insomnia.', 1, NOW(), NOW()),
  ('Deploy to production', 'Todo', 'Deploy the application to Render.', 2, NOW(), NOW())
ON CONFLICT DO NOTHING;