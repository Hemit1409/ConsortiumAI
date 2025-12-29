/**
 * Backend Developer AI Agent
 * Responsibilities:
 * - Design server-side logic and APIs
 * - Define database schemas
 * - Handle business logic implementation
 */

import { BaseAgent } from "./BaseAgent";
import { AgentRole, Task, AgentResponse } from "../types";

export class BackendDeveloperAgent extends BaseAgent {
  constructor(agentId: string = "be-agent-001") {
    super(
      agentId,
      "Backend Developer",
      AgentRole.BackendDeveloper,
      [
        "api_design",
        "database_schema",
        "business_logic",
        "integration_planning",
        "performance_optimization"
      ]
    );
  }

  async execute(task: Task): Promise<AgentResponse> {
    this.log(`Executing task: ${task.title}`);

    try {
      const implementation = await this.analyze(task.description);

      return {
        agentId: this.context.agentId,
        agentRole: this.context.role,
        taskId: task.id,
        response: implementation,
        confidence: 0.86,
        suggestedNextSteps: [
          "Implement authentication endpoints",
          "Create database migrations",
          "Set up error handling middleware",
          "Configure caching strategy"
        ]
      };
    } catch (error) {
      return {
        agentId: this.context.agentId,
        agentRole: this.context.role,
        taskId: task.id,
        response: "Failed to design backend implementation",
        confidence: 0,
        errors: [String(error)]
      };
    }
  }

  protected async analyze(input: string): Promise<string> {
    const implementation = `
Backend Implementation Design:
================================

1. API Endpoints Design:

   Authentication Service:
   - POST /api/v1/auth/register - User registration
   - POST /api/v1/auth/login - User login
   - POST /api/v1/auth/refresh - Refresh token
   - POST /api/v1/auth/logout - User logout

   Product Service:
   - GET /api/v1/products - List all products (paginated)
   - GET /api/v1/products/:id - Get product details
   - POST /api/v1/products - Create product (admin)
   - PUT /api/v1/products/:id - Update product (admin)
   - DELETE /api/v1/products/:id - Delete product (admin)
   - GET /api/v1/products/search - Search products
   - GET /api/v1/categories - List categories

   Order Service:
   - POST /api/v1/orders - Create order
   - GET /api/v1/orders - List user orders
   - GET /api/v1/orders/:id - Get order details
   - PUT /api/v1/orders/:id/cancel - Cancel order
   - GET /api/v1/orders/:id/status - Order status tracking

   Payment Service:
   - POST /api/v1/payments - Process payment
   - GET /api/v1/payments/:id - Get payment status
   - POST /api/v1/payments/:id/refund - Process refund

   User Service:
   - GET /api/v1/users/:id - Get user profile
   - PUT /api/v1/users/:id - Update profile
   - GET /api/v1/users/:id/orders - User's orders
   - POST /api/v1/users/:id/addresses - Add address
   - PUT /api/v1/users/:id/addresses/:addr_id - Update address

2. Database Schema:

   Users Table:
   - user_id (UUID, PK)
   - email (VARCHAR, UNIQUE)
   - password_hash (VARCHAR)
   - full_name (VARCHAR)
   - phone (VARCHAR)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)
   - is_active (BOOLEAN)

   Products Table:
   - product_id (UUID, PK)
   - name (VARCHAR)
   - description (TEXT)
   - price (DECIMAL)
   - stock_quantity (INTEGER)
   - category_id (UUID, FK)
   - sku (VARCHAR, UNIQUE)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

   Orders Table:
   - order_id (UUID, PK)
   - user_id (UUID, FK)
   - order_date (TIMESTAMP)
   - total_amount (DECIMAL)
   - status (ENUM: pending, confirmed, shipped, delivered, cancelled)
   - shipping_address (VARCHAR)
   - created_at (TIMESTAMP)
   - updated_at (TIMESTAMP)

   Order Items Table:
   - order_item_id (UUID, PK)
   - order_id (UUID, FK)
   - product_id (UUID, FK)
   - quantity (INTEGER)
   - unit_price (DECIMAL)
   - subtotal (DECIMAL)

   Payments Table:
   - payment_id (UUID, PK)
   - order_id (UUID, FK)
   - amount (DECIMAL)
   - payment_method (VARCHAR)
   - transaction_id (VARCHAR)
   - status (ENUM: pending, completed, failed, refunded)
   - created_at (TIMESTAMP)

3. Business Logic Implementation:

   User Registration:
   1. Validate email format
   2. Check if email already exists
   3. Hash password with bcrypt
   4. Create user record
   5. Send verification email
   6. Return JWT tokens

   Product Search:
   1. Accept search query
   2. Filter by category, price range
   3. Apply pagination
   4. Sort by relevance/price
   5. Return with pagination metadata

   Order Processing:
   1. Validate cart items
   2. Calculate total with tax
   3. Apply discount codes
   4. Lock inventory
   5. Create order record
   6. Process payment
   7. Send confirmation email
   8. Update inventory

4. Middleware Implementation:

   - Authentication Middleware:
     * Validate JWT token
     * Extract user info from token
     * Attach to request context

   - Error Handling Middleware:
     * Catch all exceptions
     * Log errors
     * Return standardized error response

   - Rate Limiting Middleware:
     * Track requests per user/IP
     * Block after threshold
     * Return 429 Too Many Requests

   - Request Logging Middleware:
     * Log all requests
     * Track response times
     * Monitor errors

5. Caching Strategy:

   Redis Cache:
   - Products list (TTL: 1 hour)
   - Product details (TTL: 30 mins)
   - User sessions (TTL: 24 hours)
   - Search results (TTL: 15 mins)

6. Error Handling:

   - Custom exception classes
   - Standardized error responses:
     {
       "error": "ERROR_CODE",
       "message": "Human readable message",
       "status": 400,
       "timestamp": "2024-01-15T10:30:00Z"
     }

7. Performance Optimizations:

   - Database indexing on frequently queried fields
   - Connection pooling for database
   - Query optimization and pagination
   - Response compression (gzip)
   - Async/await for non-blocking operations

8. Integration Points:

   - Payment Gateway Integration (Stripe/PayPal)
   - Email Service Integration (SendGrid)
   - SMS Notifications (Twilio)
   - Analytics Integration (Segment/Mixpanel)
    `;

    return implementation;
  }

  /**
   * Generate database schema in SQL format
   */
  public generateDatabaseSchema(): string {
    return `
    -- Users table
    CREATE TABLE users (
      user_id UUID PRIMARY KEY,
      email VARCHAR(255) UNIQUE NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      full_name VARCHAR(255),
      phone VARCHAR(20),
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      is_active BOOLEAN DEFAULT TRUE
    );

    -- Products table
    CREATE TABLE products (
      product_id UUID PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      description TEXT,
      price DECIMAL(10, 2) NOT NULL,
      stock_quantity INTEGER NOT NULL,
      category_id UUID,
      sku VARCHAR(100) UNIQUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Orders table
    CREATE TABLE orders (
      order_id UUID PRIMARY KEY,
      user_id UUID NOT NULL REFERENCES users(user_id),
      order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      total_amount DECIMAL(10, 2) NOT NULL,
      status VARCHAR(50) DEFAULT 'pending',
      shipping_address TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );

    -- Order items table
    CREATE TABLE order_items (
      order_item_id UUID PRIMARY KEY,
      order_id UUID NOT NULL REFERENCES orders(order_id),
      product_id UUID NOT NULL REFERENCES products(product_id),
      quantity INTEGER NOT NULL,
      unit_price DECIMAL(10, 2) NOT NULL,
      subtotal DECIMAL(10, 2) NOT NULL
    );

    CREATE INDEX idx_users_email ON users(email);
    CREATE INDEX idx_orders_user_id ON orders(user_id);
    CREATE INDEX idx_products_category ON products(category_id);
    `;
  }

  /**
   * Design API endpoints
   */
  public designAPIEndpoints(): Map<string, string[]> {
    const endpoints = new Map();
    endpoints.set("Auth", ["POST /register", "POST /login", "POST /logout", "POST /refresh"]);
    endpoints.set("Products", ["GET /products", "GET /products/:id", "POST /products", "PUT /products/:id"]);
    endpoints.set("Orders", ["POST /orders", "GET /orders", "GET /orders/:id", "PUT /orders/:id/cancel"]);
    endpoints.set("Payments", ["POST /payments", "GET /payments/:id", "POST /payments/:id/refund"]);
    return endpoints;
  }
}
