⭐ Store Rating System
📌 Project Overview

This is a full-stack web application where users can register, log in, and submit ratings for stores.
The system supports three roles with different functionalities:

System Administrator

Normal User

Store Owner

🛠 Tech Stack

Frontend (client): React.js, TailwindCSS

Backend (server): Node.js, Express.js

Database: PostgreSQL / MySQL

Authentication: JWT (JSON Web Tokens)

Environment Variables: .env file

🚀 Features
🔑 Authentication

Role-based access control (Admin, Normal User, Store Owner).

Secure login/signup using JWT.

Password validation rules.

👨‍💻 System Administrator

Add new stores, users (admin + normal).

Dashboard with:

Total users

Total stores

Total ratings

Manage (view, filter, search) users and stores.

👥 Normal User

Sign up, log in, update password.

View and search stores.

Submit/update store ratings (1–5).

🏬 Store Owner

View ratings submitted for their store.

See average store rating.

Update password.

📂 Project Structure
STORE-RATING-SYSTEM-MAIN/
│── client/                   # React frontend
│   ├── public/
│   ├── src/
│   ├── package.json
│   ├── postcss.config.js
│   └── tailwind.config.js
│
│── server/                   # Express backend
│   ├── config/               # DB & JWT configs
│   ├── middleware/           # Middlewares
│   ├── routes/               # API routes
│   ├── index.js              # Entry point
│
│── setup-db.js               # Database initialization script
│── .env                      # Environment variables
│── package.json              # Root dependencies (if any)
│── .gitignore

⚙️ Installation & Setup
1️⃣ Clone the repository
git clone https://github.com/your-username/store-rating-system.git
cd store-rating-system-main

2️⃣ Setup Environment Variables

Create a .env file in the root directory:

# Server Config
PORT=5000
JWT_SECRET=your_jwt_secret_key

# Database Config
DB_HOST=localhost
DB_PORT=5432       # 3306 if using MySQL
DB_USER=your_username
DB_PASSWORD=your_password
DB_NAME=store_rating_system

3️⃣ Setup Database

Run the setup script:

node setup-db.js

4️⃣ Run Backend
cd server
npm install
npm run dev   # or node index.js

5️⃣ Run Frontend
cd client
npm install
npm start


Frontend will run on http://localhost:3000

Backend will run on http://localhost:5000

🔑 User Roles Summary
Role	Permissions
Admin	Add users/stores, dashboard stats, filtering
Normal User	Sign up, login, rate stores, update password
Store Owner	View store ratings, average rating, update password
🤝 Contribution

Fork the repo

Create a new branch (feature/your-feature)

Commit your changes

Push to GitHub

Create a Pull Request