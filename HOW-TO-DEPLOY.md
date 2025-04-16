# Deploying Your Kanban Board on Render

Follow these simple steps to deploy your application.

## Option A: Manual Deployment (Recommended)

### Step 1: Create PostgreSQL Database
1. Sign up/log in to [Render](https://render.com)
2. Click **New +** and select **PostgreSQL**
3. Fill in the form:
   - **Name**: kanban-db
   - **Database**: kanban_db
   - **User**: postgres 
   - **Region**: Choose closest to you
4. Click **Create Database**
5. Once created, copy the **Internal Database URL** from the dashboard

### Step 2: Create Web Service
1. Click **New +** and select **Web Service**
2. Connect to your GitHub repository
3. Configure the service:
   - **Name**: kanban-app
   - **Root Directory**: (leave empty)
   - **Environment**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
4. Add environment variables:
   - **DB_URL**: (paste the Internal Database URL)
   - **JWT_SECRET**: (type any random string)
   - **NODE_ENV**: production
5. Click **Create Web Service**

### Step 3: Seed the Database
1. Go to your database dashboard in Render
2. Click on **Shell** tab
3. Copy and paste the contents of `render-setup.sql` file
4. Press Enter to execute

### Step 4: Access Your Application
1. Go to your web service dashboard
2. Click on the URL at the top to open your application
3. Log in with:
   - Username: `JollyGuru`
   - Password: `password`

## Option B: Manual Local Files

If you prefer manual deployment without GitHub:

1. Compress (ZIP) your kanban-board folder
2. Go to Render dashboard
3. Click **New +** → **Web Service**
4. Choose **Upload Files**
5. Upload your ZIP file
6. Follow Steps 2-4 above

## Troubleshooting

- **Build errors**: Check the build logs for specific issues
- **Database connection errors**: Verify the DB_URL is correct
- **Login failures**: Make sure database seeding was successful

Remember: The free tier services on Render spin down after periods of inactivity, so the first load might be slow.