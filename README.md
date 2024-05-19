# Kraftbase Backend Internship Task

Hosted at [kraftbase.aryanbharti.com](https://kraftbase.aryanbharti.com/)

## Overview

Welcome to Kraftbase's Backend Internship Task! This repository contains the codebase for the food delivery platform. The backend is built using Express using Typescript, the database being MongoDB, and Redis for caching.
 
## Task Description

You are tasked with developing the backend for a food delivery app. The backend should consist of three microservices:

1. **User Service:**
    - Retrieve a list of all restaurants available online at the given hour.
    - place the order from the available restaurants.
    - Allow users to leave ratings for their orders and delivery agents.
2. **Restaurant Service:**
    - Update the menu, pricing, and availability status (online/offline) of the restaurant.
    - accept/reject the order, and process it if they accept the order.
    - Auto-assign a delivery agent to an order based on availability.
3. **Delivery Agent Service:**
    - Update the delivery status of orders.
  
## Technologies Used

- **Language:** Typescript
- **Web Framework:** Express
- **ORM:** Mongoose and IORedis
- **Databases:** MongoDB (main database), Redis (caching)

# API (Backend)

## Endpoints

All the endpoints with their respective request and response bodies are documented in the Postman collection below:

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://app.getpostman.com/run-collection/28268592-482da518-84b4-40fa-a33c-9b27e6c068c8?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D28268592-482da518-84b4-40fa-a33c-9b27e6c068c8%26entityType%3Dcollection%26workspaceId%3D0dcfcac8-bfba-41a0-b8b9-2271625f7a6a)

## Caching

Redis is utilized for caching in this system. The filters used in queries are used as the key for the Redis storage. This approach ensures that redundant queries for the same filter do not incur additional processing time. The Redis storage also considers pagination, using the default limit of 10.

## Environment Variables

A sample of the environment file is provided in the root directory of the backend, named `.env.sample`.

## Running the Backend

To run the Kraftbase Backend, follow these steps:

1. Ensure you have Docker installed on your system.

2. Open a terminal and navigate to the root directory of the backend.

3. Copy env from  *env.sample* and make changes only if necessary.
    ```bash
    sudo nano .env
   ```

4. Run the following commands:

    ```bash
    sudo docker compose build
    sudo docker compose up
    ```
    or
    ```bash
    pnpm install
    pnpm run build
    pnpm run start
    ```

5. The application will be accessible at `http://localhost:8000` by default.

6. You can seed the database with dummy restaruants and delivery agents using `cd restaurant && pnpm run seed` and `cd delivery_agent && pnpm run seed` or `node restaurant/scripts/seed.js` and `node delivery_agent/scripts/seed.js` if built

Best Regards,
Aryan Bharti