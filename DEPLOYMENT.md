# Deploying the Kanban Board to Render

This guide will walk you through the process of deploying your Kanban Board application to Render.com.

## Prerequisites

- A [Render.com](https://render.com) account
- Your Kanban Board application code pushed to a GitHub repository

## Step 1: Create a PostgreSQL Database Service

1. Log in to your Render dashboard
2. Click on "New +" and select "PostgreSQL"
3. Configure your PostgreSQL database:
   - **Name**: kanban-db (or any name you prefer)
   - **Database**: kanban_db
   - **User**: (Render will generate this)
   - **Region**: Choose the closest to your location
   - **PostgreSQL Version**: 14 (or latest)
4. Click "Create Database"
5. Once created, note the following information from the "Connection" tab:
   - **Internal Database URL** (for use in the server deployment)
   - **External Database URL**
   - **PSQL Command** (for connecting to the database)

## Step 2: Deploy the Server

1. In your Render dashboard, click on "New +" and select "Web Service"
2. Connect your GitHub repository
3. Configure the web service:
   - **Name**: kanban-server (or any name you prefer)
   - **Root Directory**: server
   - **Runtime Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: Free (or paid tier for production)
4. Under "Environment Variables", add the following:
   - `DB_URL`: (use the Internal Database URL from step 1)
   - `JWT_SECRET`: (create a secure random string)
   - `NODE_ENV`: production

5. Click "Create Web Service"

## Step 3: Deploy the Client

1. In your Render dashboard, click on "New +" and select "Static Site"
2. Connect your GitHub repository
3. Configure the static site:
   - **Name**: kanban-client (or any name you prefer)
   - **Root Directory**: client
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: dist
4. Under "Environment Variables", add:
   - `VITE_API_URL`: https://your-server-name.onrender.com (use your server's URL from step 2)

5. Click "Create Static Site"

## Step 4: Seed the Database

After your services are deployed, you'll need to seed your database:

1. Connect to your PostgreSQL database using the PSQL command from step 1
2. Once connected, run:
   ```sql
   INSERT INTO users (username, password, "createdAt", "updatedAt") 
   VALUES ('admin', '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', NOW(), NOW());
   ```
   (This creates a user with username 'admin' and password 'password')

## Step 5: Testing the Deployment

1. Visit your static site URL (from step 3)
2. Log in using the admin credentials you created
3. Verify that you can view, create, update, and delete tickets

## Troubleshooting

If you encounter issues:

1. **Database Connection Errors**: Double-check your environment variables and ensure they match the Render-provided database connection information
2. **CORS Issues**: Ensure your server is properly configured to accept requests from your client URL
3. **Authentication Failures**: Verify that the JWT secret is set correctly and that the login route works properly
4. **Deployment Failures**: Check the build logs in Render for specific error messages

## Conclusion

Your Kanban Board application should now be fully deployed and functional on Render.com. The server API is available at your server URL, and the client is accessible through your static site URL.