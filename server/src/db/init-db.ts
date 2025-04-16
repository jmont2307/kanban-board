import dotenv from 'dotenv';
dotenv.config();

import { execSync } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const schemaPath = path.join(__dirname, 'schema.sql');

// Get database connection info from environment variables
const dbName = process.env.DB_NAME || 'kanban_db';
const dbUser = process.env.DB_USERNAME || 'postgres';
const dbPassword = process.env.DB_PASSWORD || '';
const dbHost = process.env.DB_HOST || 'localhost';
const dbPort = process.env.DB_PORT || '5432';

console.log('Initializing database...');

try {
  // Run the schema.sql file to create the database
  console.log('Creating database...');
  execSync(`psql -U ${dbUser} -h ${dbHost} -p ${dbPort} -f ${schemaPath}`, {
    env: {
      ...process.env,
      PGPASSWORD: dbPassword
    }
  });
  console.log('Database created successfully.');
} catch (error) {
  console.error('Error initializing database:', error);
  process.exit(1);
}