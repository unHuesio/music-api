import swaggerJsdoc from 'swagger-jsdoc';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Music API',
      version: '1.0.0',
      description: 'API Documentation for the Music API Service',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
      {
        url: 'https://music-api-29813145857.europe-west1.run.app',
        description: 'Production server',
      }
    ],
    components: {
      securitySchemes: {
        // defined later if needed
      },
      schemas: {
        Product: {
           type: 'object',
           properties: {
             id: { type: 'string', format: 'uuid' },
             name: { type: 'string' },
             artist: { type: 'string' },
             coverArt: { type: 'string' },
           }
        }
      }
    },
  },
  // Look for comments in these files AND yaml files
  apis: [
      './src/interfaces/http/routes/*.ts', 
      './src/interfaces/http/controllers/*.ts', 
      './src/domain/entities/*.ts',
      './src/interfaces/http/docs/*.yaml' // Include YAML files
  ], 
};

export const swaggerSpecs = swaggerJsdoc(options);
