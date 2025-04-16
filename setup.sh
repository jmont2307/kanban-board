#!/bin/bash

# Display header
echo "==================================================="
echo "   Kanban Board Application Setup                  "
echo "==================================================="

# Check if PostgreSQL is installed
if ! command -v psql &> /dev/null; then
    echo "PostgreSQL is not installed. Please install PostgreSQL first."
    exit 1
fi

echo "Step 1: Installing server dependencies..."
cd server
npm install
echo "Server dependencies installed successfully."

echo "Step 2: Installing client dependencies..."
cd ../client
npm install
echo "Client dependencies installed successfully."

echo "Step 3: Setting up the database..."
cd ../server
npm run db:init
echo "Database initialized successfully."

echo "Step 4: Seeding the database..."
npm run db:seed
echo "Database seeded successfully."

echo "Step 5: Building the application..."
npm run build
cd ../client
npm run build
echo "Application built successfully."

echo "==================================================="
echo "  Setup Complete! You can now run the application  "
echo "==================================================="
echo ""
echo "To start the server:"
echo "  cd server"
echo "  npm run dev"
echo ""
echo "To start the client:"
echo "  cd client"
echo "  npm run dev"
echo ""
echo "Then access the application at: http://localhost:5173"
echo ""
echo "Login with any of these credentials:"
echo "  Username: JollyGuru    Password: password"
echo "  Username: SunnyScribe  Password: password"
echo "  Username: RadiantComet Password: password"
echo ""
echo "==================================================="