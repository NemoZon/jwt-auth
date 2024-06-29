# JWT Authentication Example

This repository contains a JWT authentication example with both client-side and server-side setup. The project uses MongoDB for data storage and Gmail for email verification.

## Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) installed on your computer.

### Clone the Repository

To clone the repository and access the project folder, run the following commands:
```bash
  git clone https://github.com/NemoZon/jwt-auth.git
```
## Server Setup

### Install dependencies for a server side

Navigate to the server directory and install the necessary dependencies:

```bash
  cd ./server
  npm install
```

## Environment Configuration

Create a local environment file for server configuration:

```bash
  node --eval "fs.writeFileSync('.env.local','')"
```

Edit the .env.local file by copying the contents from .env and updating the necessary values.

### MongoDB Setup
1) Create a MongoDB cluster by signing up or logging into [MongoDB](https://www.mongodb.com/).

2) Obtain your MongoDB connection string *(format: mongodb+srv://...)* and add it to the .env.local file as **DB_URL**.

### Email Configuration

To use Gmail as the SMTP service for sending email validations:

1) Replace **SMTP_USER** with your Gmail address.

2) Replace **SMTP_PASSWORD** with your app password.

### Run the Server

Start the server using:

```bash
  npm run dev
```
## Client Setup

## Install Client Dependencies

Navigate to the client directory and install the necessary dependencies:

```bash
  cd ./client
  npm i
```
## Run the Client

Start the client application:

```bash
  npm start
```

## Access the Application
- Frontend: http://localhost:3000/
- Backend: http://localhost:7000/api
