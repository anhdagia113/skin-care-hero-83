
# Skin Care Hero - API Backend

## Overview

Skin Care Hero is a comprehensive management system for skin care centers, featuring customer skin assessment, service booking, staff management, and administrative dashboards.

## Features

- Customer registration and authentication
- Skin type assessment and service recommendations
- Appointment booking and management
- Staff task assignment and service tracking
- Comprehensive admin dashboard with reports
- Feedback collection and analysis

## Technology Stack

- **Java 17**
- **Spring Boot 3.2.4**
- **Spring Security with JWT**
- **Spring Data JPA**
- **MySQL Database**
- **Maven**
- **OpenAPI Documentation (Swagger)**

## Setup and Running Instructions

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

### Running the Application

#### Option 1: Using Maven

1. Navigate to the project directory
2. Run the application using Maven:
   ```bash
   mvn spring-boot:run
   ```

#### Option 2: Using IDE

1. Open the project in your preferred IDE
2. Run the main class: `com.skincare.Application`

### API Documentation

Once the application is running, access the Swagger UI documentation:
- URL: http://localhost:8080/swagger-ui.html

### Authentication (Temporarily Disabled for Testing)

Authentication is currently disabled for testing purposes. In the application.properties file, the property `skincare.app.jwtEnabled` is set to `false`.

To enable authentication:
1. Change the property to `true` in `application.properties`:
   ```properties
   skincare.app.jwtEnabled=true
   ```
2. Or remove the property entirely (default is `true`)

## API Endpoints

The system provides the following API categories:

### Public APIs (No Authentication Required)
- `GET /api/home`: Home page information
- `GET /api/services`: List of skincare services

### Customer APIs (ROLE_CUSTOMER)
- `POST /api/auth/register`: Customer registration
- `POST /api/auth/login`: Customer login
- `POST /api/skin-test`: Take a skin test to get service recommendations
- `POST /api/bookings`: Book a service
- `GET /api/customers/me`: View personal information
- `GET /api/customers/me/bookings`: View booking history
- `POST /api/feedback`: Submit rating and feedback
- `DELETE /api/bookings/{id}`: Cancel a booking

### Staff APIs (ROLE_STAFF)
- `PUT /api/bookings/{id}/checkin`: Check-in customers
- `PUT /api/bookings/{id}/assign`: Assign therapist
- `PUT /api/bookings/{id}/result`: Record service results
- `PUT /api/bookings/{id}/checkout`: Check-out customers

### Admin APIs (ROLE_ADMIN)
- Service management: `POST /api/services`, `PUT /api/services/{id}`, `DELETE /api/services/{id}`
- Therapist management: `POST /api/therapists`, `PUT /api/therapists/{id}`
- Schedule management: `GET /api/schedule`, `PUT /api/schedule`
- Payment policy: `GET /api/payment-policy`, `PUT /api/payment-policy`
- Payment processing: `POST /api/bookings/{id}/payment`
- Feedback review: `GET /api/feedback`
- Dashboard: `GET /api/dashboard`
- Reports: `GET /api/reports?startDate={date}&endDate={date}`

## Development

### Adding Initial Data

To add initial data, you can create a SQL script in the `src/main/resources` directory and either:
1. Run it manually in your MySQL client
2. Configure Spring Boot to run it at startup:
   ```properties
   spring.sql.init.mode=always
   spring.sql.init.data-locations=classpath:data.sql
   ```

### Database Schema Updates

The application uses Hibernate auto-update:
```properties
spring.jpa.hibernate.ddl-auto=update
```

This will automatically create or update database tables based on entity definitions.
