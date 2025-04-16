# Kanban Board with JWT Authentication

A full-stack Kanban board application with JWT-based authentication for managing tasks.

## Features

- Secure user authentication using JSON Web Tokens (JWT)
- Responsive Kanban board interface with drag-and-drop functionality
- Create, edit, and delete tasks
- Categorize tasks by status (Todo, In Progress, Done)
- Automatic session expiration for enhanced security

## Tech Stack

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL with Sequelize ORM
- **Authentication**: JWT (JSON Web Tokens)

## Setup Instructions

Follow these steps to set up the Kanban board application:

1. **Clone the Repository**:
   ```
   git clone <repository-url>
   cd kanban-board
   ```

2. **Configure Environment Variables**:
   - Create a `.env` file in the `server` directory with the required variables:
     ```
     DB_USERNAME=your_db_username
     DB_PASSWORD=your_db_password
     DB_NAME=kanban_db
     DB_HOST=localhost
     DB_PORT=5432
     JWT_SECRET=your_secret_key
     PORT=3001
     ```

3. **Install Dependencies**:
   - For the server:
     ```
     cd server
     npm install
     ```
   - For the client:
     ```
     cd ../client
     npm install
     ```

4. **Initialize the Database**:
   - Create the database and user:
     ```
     psql -U postgres
     CREATE DATABASE kanban_db;
     CREATE USER your_db_username WITH PASSWORD 'your_db_password';
     GRANT ALL PRIVILEGES ON DATABASE kanban_db TO your_db_username;
     \q
     ```
   - Run the database schema:
     ```
     cd ../server
     npm run db:init
     ```
   - (Optional) Seed the database with sample data:
     ```
     npm run db:seed
     ```

5. **Run the Application**:
   - Start the server:
     ```
     cd ../server
     npm run dev
     ```
   - Start the client in a new terminal:
     ```
     cd ../client
     npm run dev
     ```
   - Open your browser and navigate to `http://localhost:5173`.

These instructions will help you set up and run the application locally.

### Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

### Environment Setup

1. Clone this repository:
   ```
   git clone <repository-url>
   cd kanban-board
   ```

2. Create a `.env` file in the server directory with the following variables:
   ```
   # Database Configuration
   DB_USERNAME=your_db_username
   DB_PASSWORD=your_db_password
   DB_NAME=kanban_db
   DB_HOST=localhost
   DB_PORT=5432

   # JWT Configuration
   JWT_SECRET=your_secret_key

   # Server Configuration
   PORT=3001
   ```

3. Create the PostgreSQL database:
   ```
   psql -U postgres
   CREATE DATABASE kanban_db;
   CREATE USER your_db_username WITH PASSWORD 'your_db_password';
   GRANT ALL PRIVILEGES ON DATABASE kanban_db TO your_db_username;
   \q
   ```

### Installation

1. Install server dependencies:
   ```
   cd server
   npm install
   ```

2. Install client dependencies:
   ```
   cd ../client
   npm install
   ```

### Database Initialization

1. Run the database schema:
   ```
   cd ../server
   npm run db:init
   ```

2. Seed the database with sample data (optional):
   ```
   npm run db:seed
   ```

### Running the Application

1. Start the server:
   ```
   cd ../server
   npm run dev
   ```

2. In a new terminal, start the client:
   ```
   cd ../client
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:5173`

### Authentication
- `POST /auth/login` - User login

### Tickets
- `GET /api/tickets` - Get all tickets
- `GET /api/tickets/:id` - Get a specific ticket
- `POST /api/tickets` - Create a new ticket
- `PUT /api/tickets/:id` - Update a ticket
- `DELETE /api/tickets/:id` - Delete a ticket

## Screenshots

- **Deployed Application**: [Kanban Board App](https://kanban-board-nshx.onrender.com)
- **GitHub Repository**: [jmont2307/kanban-board](https://github.com/jmont2307/kanban-board)

### Login Screen
![Login Screen](/screenshots/login-screen.png)

### Kanban Board Overview
![Kanban Board](/screenshots/kanban-board.png)

### Task Creation
![Task Creation](/screenshots/task-creation.png)

*Note: To access the application, use the following credentials:*
- Username: `JollyGuru`
- Password: `password`

## Credits

This project was created with assistance from:
- Online Learning Assistant
- Claude
- Google

## License

This project is licensed under the MIT License.