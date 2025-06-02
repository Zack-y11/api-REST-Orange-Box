// src/docs/swagger.ts
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Orange Box API',
      version: '1.0.0',
      description: 'A modern REST API for managing products and providers with advanced features like pagination, filtering, and real-time data validation.',
      contact: {
        name: 'API Support',
        email: 'support@orangebox.com'
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'some-production-url.com',
        description: 'Production server'
      }
    ],
    components: {
      schemas: {
        Provider: {
          type: 'object',
          required: ['name', 'address', 'phone', 'description'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the provider',
              example: '64a7b8c9d1234567890abcde'
            },
            name: {
              type: 'string',
              description: 'Name of the provider',
              example: 'Tech Solutions Inc'
            },
            address: {
              type: 'string',
              description: 'Physical address of the provider',
              example: '123 Tech Street, Silicon Valley, CA 94000'
            },
            phone: {
              type: 'string',
              description: 'Contact phone number',
              example: '+1-555-0123'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Contact email address',
              example: 'contact@techsolutions.com'
            },
            description: {
              type: 'string',
              description: 'Description of the provider',
              example: 'Leading technology solutions provider'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Provider creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Provider last update timestamp'
            }
          }
        },
        CreateProvider: {
          type: 'object',
          required: ['name', 'address', 'phone', 'description'],
          properties: {
            name: {
              type: 'string',
              description: 'Name of the provider',
              example: 'Tech Solutions Inc'
            },
            address: {
              type: 'string',
              description: 'Physical address of the provider',
              example: '123 Tech Street, Silicon Valley, CA 94000'
            },
            phone: {
              type: 'string',
              description: 'Contact phone number',
              example: '+1-555-0123'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Contact email address (optional)',
              example: 'contact@techsolutions.com'
            },
            description: {
              type: 'string',
              description: 'Description of the provider',
              example: 'Leading technology solutions provider'
            }
          }
        },
        UpdateProvider: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the provider',
              example: 'Updated Tech Solutions Inc'
            },
            address: {
              type: 'string',
              description: 'Physical address of the provider',
              example: '456 New Tech Avenue, Silicon Valley, CA 94000'
            },
            phone: {
              type: 'string',
              description: 'Contact phone number',
              example: '+1-555-0199'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Contact email address',
              example: 'info@techsolutions.com'
            },
            description: {
              type: 'string',
              description: 'Description of the provider',
              example: 'Updated leading technology solutions provider'
            }
          }
        },
        Product: {
          type: 'object',
          required: ['name', 'price', 'description', 'provider', 'stock'],
          properties: {
            _id: {
              type: 'string',
              description: 'Unique identifier for the product',
              example: '64a7b8c9d1234567890abcde'
            },
            name: {
              type: 'string',
              description: 'Name of the product',
              example: 'Premium Laptop'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Price of the product',
              example: 1299.99
            },
            description: {
              type: 'string',
              description: 'Detailed description of the product',
              example: 'High-performance laptop with latest specifications'
            },
            provider: {
              type: 'string',
              description: 'Provider ID (ObjectId reference)',
              example: '64a7b8c9d1234567890abcde'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Available stock quantity',
              example: 50
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'discontinued'],
              description: 'Product status',
              example: 'active'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Product last update timestamp'
            }
          }
        },
        CreateProduct: {
          type: 'object',
          required: ['name', 'price', 'description', 'provider', 'stock'],
          properties: {
            name: {
              type: 'string',
              description: 'Name of the product',
              example: 'Premium Laptop'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Price of the product',
              example: 1299.99
            },
            description: {
              type: 'string',
              description: 'Detailed description of the product',
              example: 'High-performance laptop with latest specifications'
            },
            provider: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
              description: 'Provider ID (ObjectId format)',
              example: '64a7b8c9d1234567890abcde'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Available stock quantity',
              example: 50
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'discontinued'],
              default: 'active',
              description: 'Product status',
              example: 'active'
            }
          }
        },
        UpdateProduct: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Name of the product',
              example: 'Updated Premium Laptop'
            },
            price: {
              type: 'number',
              minimum: 0,
              description: 'Price of the product',
              example: 1199.99
            },
            description: {
              type: 'string',
              description: 'Detailed description of the product',
              example: 'Updated high-performance laptop with latest specifications'
            },
            provider: {
              type: 'string',
              pattern: '^[0-9a-fA-F]{24}$',
              description: 'Provider ID (ObjectId format)',
              example: '64a7b8c9d1234567890abcde'
            },
            stock: {
              type: 'integer',
              minimum: 0,
              description: 'Available stock quantity',
              example: 30
            },
            status: {
              type: 'string',
              enum: ['active', 'inactive', 'discontinued'],
              description: 'Product status',
              example: 'active'
            }
          }
        },
        Pagination: {
          type: 'object',
          properties: {
            currentPage: {
              type: 'integer',
              description: 'Current page number',
              example: 1
            },
            totalPages: {
              type: 'integer',
              description: 'Total number of pages',
              example: 5
            },
            totalItems: {
              type: 'integer',
              description: 'Total number of items',
              example: 50
            },
            itemsPerPage: {
              type: 'integer',
              description: 'Number of items per page',
              example: 10
            },
            hasNext: {
              type: 'boolean',
              description: 'Whether there is a next page',
              example: true
            },
            hasPrev: {
              type: 'boolean',
              description: 'Whether there is a previous page',
              example: false
            }
          }
        },
        ApiResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              description: 'Whether the request was successful',
              example: true
            },
            message: {
              type: 'string',
              description: 'Response message',
              example: 'Operation completed successfully'
            },
            data: {
              type: 'object',
              description: 'Response data'
            }
          }
        },
        ValidationError: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Validation error'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string',
                    example: 'name'
                  },
                  message: {
                    type: 'string',
                    example: 'Name is required'
                  }
                }
              }
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'An error occurred'
            },
            error: {
              type: 'string',
              example: 'Error details'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts', './src/schemas/*.ts', './src/controllers/*.ts'],
};

export const specs = swaggerJsdoc(options);
export const swaggerMiddleware = swaggerUi.setup(specs, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'Orange Box API Documentation'
});