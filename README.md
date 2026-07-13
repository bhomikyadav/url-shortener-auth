# URL Shortener Auth Service

A NestJS-based backend for an authenticated URL shortener with Redis caching, MongoDB persistence, and RabbitMQ-based analytics events.

## Overview

This project provides a backend service that allows users to:

- register and log in securely
- create short URLs for long links
- redirect short URLs to their original destinations
- cache redirect targets in Redis for faster responses
- publish analytics events for URL clicks to RabbitMQ

## Tech Stack

- NestJS
- TypeScript
- MongoDB with Mongoose
- Redis
- RabbitMQ
- JWT + Passport
- Docker Compose

## Features

### Authentication

- user registration
- user login
- JWT access and refresh tokens
- protected routes for URL creation

### URL Management

- create short URLs
- redirect short URLs to the original URL
- store URL records in MongoDB
- cache redirect targets in Redis

### Analytics

- collect basic click metadata such as IP, browser, OS, device, and timestamp
- publish analytics data to RabbitMQ for downstream processing

## Architecture

The application is organized into modules:

- Auth module: handles registration, login, and token refresh
- URL module: creates and resolves short links
- Users module: manages user persistence
- Redis module: provides cache operations
- RabbitMQ module: publishes analytics events
- Analytics module: supports analytics-related processing

## Prerequisites

Before running the project, make sure you have:

- Node.js 20+
- npm
- Docker Desktop
- MongoDB and Redis running locally or through Docker

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Create an environment file

```bash
cp .env.example .env
```

3. Start the required services

```bash
docker compose up -d
```

4. Start the development server

```bash
npm run start:dev
```

## Environment Variables

Create a .env file with values similar to:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/url-shortener
REDIS_CLIENT=redis://localhost:6379
RABBITMQ_HOST=localhost
RABBITMQ_PORT=5672
RABBITMQ_USERNAME=admin
RABBITMQ_PASSWORD=Admin@123
RABBITMQ_VHOST=/
JWT_SECRET_KEY_ACCESS_TOKEN=your_access_secret
JWT_SECRET_KEY_REFRESH_TOKEN=your_refresh_secret
BCRYPT_SALT=10
```

## API Endpoints

### Authentication

- POST /auth/register
- POST /auth/login
- POST /auth/refresh-token

### URL

- POST /url - create a short URL (requires authentication)
- GET /url/:id - redirect to the original URL

### Example Requests

Register a user:

```bash
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"secret123"}'
```

Create a short URL:

```bash
curl -X POST http://localhost:3000/url \
  -H "Authorization: Bearer <access_token>" \
  -H "Content-Type: application/json" \
  -d '{"originalUrl":"https://example.com"}'
```

## Development Commands

```bash
npm run build
npm run test
npm run start:dev
```

## Project Structure

```text
src/
  app.module.ts
  main.ts
  common/
  config/
  dto/
  modules/
  schema/
```

## Notes

This project is a strong backend portfolio project and demonstrates practical use of:

- NestJS modular architecture
- authentication and authorization
- database integration
- caching with Redis
- asynchronous messaging with RabbitMQ

## Future Improvements

Possible next steps include:

- full analytics consumer service
- custom aliases and expiration settings
- Swagger/OpenAPI documentation
- unit and integration tests
- deployment configuration
