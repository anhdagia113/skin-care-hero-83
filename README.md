
# Skin Care Hero

## Overview

Skin Care Hero is a comprehensive management system for skin care centers, featuring customer skin assessment, service booking, staff management, and administrative dashboards.

## Features

- Customer registration and authentication
- Skin type assessment and service recommendations
- Appointment booking and management
- Staff task assignment and service tracking
- Comprehensive admin dashboard with reports
- Feedback collection and analysis

## Frontend Setup and Running Instructions

### Prerequisites

1. Node.js (version 16 or later)
2. npm, yarn, or pnpm package manager

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

### Running the Frontend Application

1. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```
2. Open your browser and navigate to `http://localhost:3000` or the URL shown in your terminal

### Demo Login Credentials

You can use the following credentials to test the application:

#### Customer Login
- **Username**: customer
- **Password**: password123

#### Staff Login
- **Username**: staff
- **Password**: password123

#### Admin Login
- **Username**: admin
- **Password**: password123

## Backend Setup (Java Spring Boot)

### Prerequisites

1. Java 17 JDK installed
2. Maven installed
3. MySQL installed and running
4. IDE of your choice (IntelliJ IDEA, Eclipse, VS Code, etc.)

### Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE skincare_db;
   ```
   
2. Configure the database connection in `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/skincare_db?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
   spring.datasource.username=your-username
   spring.datasource.password=your-password
   ```

### Running the Backend Application

#### Option 1: Using Maven

1. Navigate to the project directory
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

#### Option 2: Using IDE

1. Open the project in your preferred IDE
2. Run the main class: `com.skincare.Application`

### Authentication (Temporarily Disabled for Development)

Authentication is currently disabled for testing purposes. This means you can access all endpoints without authentication during development. In the `application.properties` file, the property `skincare.app.jwtEnabled` is set to `false`.

To enable authentication:
1. Change the property to `true` in `application.properties`:
   ```properties
   skincare.app.jwtEnabled=true
   ```
2. Or remove the property entirely (default is `true`)

## API Documentation

Once the backend application is running, access the Swagger UI documentation:
- URL: http://localhost:8080/swagger-ui.html

## Project Structure

- `src/main/java/com/skincare`: Backend Java code
- `src/main/resources`: Backend configuration files
- `src/`: Frontend React code
  - `src/components`: UI components
  - `src/pages`: Main application pages
  - `src/hooks`: Custom React hooks
  - `src/api`: API client functions
  - `src/types`: TypeScript type definitions

## Development Notes

- The application currently uses mock data for development purposes
- The backend API is designed to be RESTful
- Frontend is built with React, TypeScript and Tailwind CSS
