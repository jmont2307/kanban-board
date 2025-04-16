# Deploying the Kanban Board to Render using render.yaml

This guide provides simplified steps for deploying your Kanban Board application to Render.com using the provided `render.yaml` file.

## Prerequisites

1. A [Render.com](https://render.com) account (sign up for free)
2. Your Kanban Board code pushed to a GitHub repository
3. Render connected to your GitHub account

## Simplified Deployment Steps

### Option 1: Blueprint Deployment (Recommended)

1. Log in to your Render dashboard
2. Click on "New" and select "Blueprint"
3. Connect to your GitHub repository
4. Render will automatically detect the `render.yaml` file and configure all services
5. Review the proposed services (database, server, and client)
6. Click "Apply" to deploy all services at once

### Option 2: Manual Service Setup

If the Blueprint option doesn't work for any reason, you can deploy each service manually:

#### Step 1: Create a PostgreSQL Database

1. In Render dashboard, click "New" and select "PostgreSQL"
2. Configure the database:
   - **Name**: kanban-db
   - **Database**: kanban_db
   - **User**: (Render will generate this)
   - **Region**: Choose the closest to your location
3. Click "Create Database"
4. Copy the "Internal Database URL" from the Connections tab

#### Step 2: Deploy the Server

1. In Render dashboard, click "New" and select "Web Service"
2. Connect to your GitHub repository
3. Configure the web service:
   - **Name**: kanban-server
   - **Root Directory**: server
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add the following environment variables:
   - `DB_URL`: Paste the Internal Database URL from Step 1
   - `JWT_SECRET`: Create a random string (e.g., `openssl rand -hex 32`)
   - `NODE_ENV`: production
5. Click "Create Web Service"

#### Step 3: Deploy the Client

1. In Render dashboard, click "New" and select "Static Site"
2. Connect to your GitHub repository
3. Configure the static site:
   - **Name**: kanban-client
   - **Root Directory**: client
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
4. Add the environment variable:
   - `VITE_API_URL`: Use the URL of your server from Step 2 (like `https://kanban-server.onrender.com`)
5. Click "Create Static Site"

#### Step 4: Seed the Database

1. Connect to your database using the PSQL command from the Connections tab in your database service
2. Run the following SQL script to create a test user:

```sql
INSERT INTO users (username, password, "createdAt", "updatedAt") 
VALUES (
  'admin', 
  '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', 
  NOW(), 
  NOW()
);
```

This creates a user with:
- Username: admin
- Password: password

## Testing Your Deployment

1. Visit your client URL (e.g., `https://kanban-client.onrender.com`)
2. Log in with the admin credentials
3. You should be able to create, view, edit, and delete tickets

## Troubleshooting

If you encounter issues:

1. **Database Connection Errors**: Check that your `DB_URL` environment variable is set correctly
2. **Login Failures**: Verify that the JWT secret is set correctly
3. **API Connection Issues**: Make sure that `VITE_API_URL` points to your server URL
4. **Build Failures**: Check the build logs in Render for specific error messages

Remember that the free tier of Render has limitations, including:
- Services spin down after periods of inactivity
- Initial load times may be slow
- Database storage and performance are limited