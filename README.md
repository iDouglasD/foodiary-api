# Foodiary API 🍽️

A serverless API for nutrition tracking and dietary management, built with AWS Lambda and TypeScript.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Setup](#environment-setup)
- [Running the Project](#running-the-project)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Deployment](#deployment)
- [Development](#development)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Overview

Foodiary API is a serverless backend service designed to help users track their nutrition goals and dietary habits. The API provides user authentication and management features with a focus on personalized nutrition tracking.

## ✨ Features

- **User Authentication**: Secure user registration and login
- **User Profile Management**: Personal information, goals, and preferences
- **Nutrition Goal Tracking**: Customizable calorie, protein, carbohydrate, and fat targets
- **Serverless Architecture**: Built for scalability and cost-effectiveness
- **Type Safety**: Full TypeScript implementation
- **Database Integration**: PostgreSQL with Drizzle ORM

## 🛠️ Tech Stack

- **Runtime**: Node.js 22.x
- **Language**: TypeScript
- **Framework**: AWS Lambda (Serverless Framework)
- **Database**: PostgreSQL (Neon Database)
- **ORM**: Drizzle ORM
- **Validation**: Zod
- **Development**: Serverless Offline
- **Architecture**: ARM64

## 📁 Project Structure

```
foodiary-api/
├── src/
│   ├── controllers/         # Business logic controllers
│   │   ├── SignInController.ts
│   │   └── SignUpController.ts
│   ├── db/                 # Database configuration and schema
│   │   ├── index.ts
│   │   └── schema.ts
│   ├── functions/          # AWS Lambda functions
│   │   ├── signin.ts
│   │   └── signup.ts
│   ├── types/              # TypeScript type definitions
│   │   └── Http.ts
│   └── utils/              # Utility functions
│       ├── http.ts
│       ├── parseEvent.ts
│       └── parseResponse.ts
├── drizzle.config.ts       # Drizzle ORM configuration
├── serverless.yml          # Serverless Framework configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## 📋 Prerequisites

Before running this project, ensure you have:

- **Node.js** (v22 or higher)
- **npm** package manager
- **AWS CLI** configured (for deployment)
- **PostgreSQL database** (Neon Database recommended)

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/iDouglasD/foodiary-api.git
   cd foodiary-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Install Serverless Framework globally** (if not already installed)
   ```bash
   npm install -g serverless
   ```

## 🔧 Environment Setup

1. **Create environment file**
   ```bash
   cp .env.example .env
   ```

2. **Configure environment variables**
   ```env
   DATABASE_URL=postgresql://username:password@host:port/database
   ```

3. **Set up your PostgreSQL database**
   - Create a new database in [Neon](https://neon.tech/) or your preferred PostgreSQL provider
   - Copy the connection string to your `.env` file

## 🏃‍♂️ Running the Project

### Development Mode

Start the local development server:

```bash
npm run dev
```

This will start the serverless offline environment on `http://localhost:3000`

### Database Operations

Generate and run database migrations:

```bash
# Generate migration files
npx drizzle-kit generate

# Run migrations
npx drizzle-kit migrate
```
## 🚀 Deployment

### AWS Deployment

1. **Configure AWS credentials**
   ```bash
   aws configure
   ```

2. **Deploy to AWS**
   ```bash
   serverless deploy
   ```

3. **Deploy specific function**
   ```bash
   serverless deploy function -f signup
   ```

## 🔧 Development

### Code Style

This project uses TypeScript with strict type checking. Ensure your code:

- Follows TypeScript best practices
- Includes proper type definitions
- Uses Zod for runtime validation
- Follows the existing project structure

### Database Migrations

When making schema changes:

1. Update `src/db/schema.ts`
2. Generate migration: `npx drizzle-kit generate`
3. Run migration: `npx drizzle-kit migrate`

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

If you have any questions or need help with the project, please:

1. Check the [Issues](https://github.com/iDouglasD/foodiary-api/issues) page
2. Create a new issue if your question isn't already addressed
3. Provide detailed information about your problem

---
