import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Application } from 'express';
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'User Service',
            version: '1.0.0',
            description: 'user service api for the artwork management system',
        },
        servers: [
            {
                url: 'http://localhost:8990',
            },
        ],
    },
    apis: ['packages/user-service/src/routes/*.ts'],
};

const swaggerSpecs = swaggerJsdoc(options);

const swaggerDocs = (app: Application) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));
};

export default swaggerDocs;