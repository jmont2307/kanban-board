# Simple Render Deployment Guide

## Option 1: Blueprint Deployment (Recommended)

1. **Push Your Code to GitHub**
   - Create a GitHub repository
   - Push your code to the repository

2. **Deploy on Render**
   - Sign up/login on [render.com](https://render.com)
   - From the dashboard, click "New" → "Blueprint"
   - Select your GitHub repository
   - Render will detect the `render.yaml` file and configure your services
   - Review settings and click "Apply"

3. **Access Your Application**
   - Once deployment completes, click on the web service URL
   - Log in using:
     - Username: `JollyGuru`
     - Password: `password`

## Option 2: Manual Deployment

If the Blueprint option doesn't work, you can deploy manually:

1. **Create PostgreSQL Database**
   - In Render dashboard, click "New" → "PostgreSQL"
   - Name: kanban-db
   - Database: kanban_db
   - Click "Create"
   - Copy the Internal Database URL

2. **Deploy Web Service**
   - Click "New" → "Web Service"
   - Connect to your GitHub repository
   - Configure service:
     - Name: kanban-app
     - Build Command: `npm install && npm run build`
     - Start Command: `npm start`
   - Add environment variables:
     - `DB_URL`: (paste Internal Database URL)
     - `JWT_SECRET`: (any random secure string)
     - `NODE_ENV`: production
   - Click "Create Web Service"

3. **Seed the Database**
   - Use the PSQL command from your database dashboard to connect
   - Run:
   ```sql
   INSERT INTO users (username, password, "createdAt", "updatedAt") 
   VALUES ('JollyGuru', '$2b$10$3JvSsaXy9QUKDo5voGf4I.oXgHF0DSz9g2N3uhJPUbO3OcOHELmUi', NOW(), NOW());
   ```

## Troubleshooting

- **Build Failures**: Check that TypeScript is compiling correctly
- **Database Errors**: Verify environment variables are set properly
- **Login Issues**: Make sure database seeding was successful

Remember that on the free tier:
- Services may spin down after periods of inactivity
- Initial load may be slow