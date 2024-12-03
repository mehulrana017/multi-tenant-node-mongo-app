# Multi-Tenancy App with Node.js, TypeScript, and MongoDB

This project is a multi-tenancy application built using Node.js, TypeScript, and MongoDB. It supports dynamic database switching for each tenant.

## Features

- Multi-tenancy support with dynamic database switching
- User registration and login per tenant
- Tenant-specific data storage
- RESTful API with JWT authentication

## Tech Stack

- **Node.js**: JavaScript runtime for building the backend
- **Express**: Web framework for Node.js
- **TypeScript**: Static type checking for JavaScript
- **MongoDB**: NoSQL database for storing tenant and user data
- **Mongoose**: MongoDB ODM for data modeling
- **JWT**: For secure user authentication
- **bcryptjs**: For hashing passwords

---

## Prerequisites

- Node.js and Yarn should be installed on your machine.
- MongoDB Atlas account for a cloud-hosted MongoDB instance.
- Docker installed for containerized deployment.

---

## Installation (Local)

1. Clone the repository:

   ```bash
   git clone https://github.com/mehulrana017/multi-tenant-node-mongo-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd multi-tenancy-app
   ```

3. Install dependencies using Yarn:

   ```bash
   yarn install
   ```

4. Create a `.env` file in the root directory and configure the following variables:

   ```env
   MONGO_URI=<your-mongo-atlas-uri>
   MONGO_CLUSTER_URL=<your-mongo-cluster-uri>
   MONGO_USER=<your-mongo-user>
   MONGO_PASSWORD=<your-mongo-password>
   JWT_SECRET=<your-jwt-secret>
   PORT=5000
   ```

5. Run the application locally:

   ```bash
   yarn start
   ```

6. To start the development server with live-reloading:

   ```bash
   yarn dev
   ```

---

## Installation (Using Docker)

1. Ensure Docker is installed and running on your machine.

2. Build the Docker image:

   ```bash
   yarn docker:build
   ```

3. Start the application using Docker Compose:

   ```bash
   yarn docker:compose:up
   ```

4. To stop the Docker containers:

   ```bash
   yarn docker:compose:down
   ```

5. If you want to clean up stopped containers and unused images:

   ```bash
   docker system prune
   ```

---

## Directory Structure

```plaintext
multi-tenancy-app/
│
├── docker/                   # Docker-related configuration
│   ├── .dockerignore         # Ignored files for Docker builds
│   ├── docker-compose.yml    # Docker Compose configuration
│   └── Dockerfile            # Dockerfile for containerizing the app
│
├── src/                      # Application source code
│   ├── config/               # Configuration and utility files
│   ├── controllers/          # API route controllers
│   ├── models/               # Mongoose models
│   ├── routes/               # Express route definitions
│   ├── utils/                # Helper utilities
│   └── app.ts                # Main app entry point
│
├── .env                      # Environment variables
├── .gitignore                # Git ignored files
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript configuration
└── README.md                 # Documentation
```
