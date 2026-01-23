/**
 * 🔹 OPENAPI SPECIFICATION (The Contract)
 * 
 * This file defines the API structure in the standard OpenAPI 3.0 format.
 * In a real-world scenario, you might use a library to generate this from Zod,
 * but defining it manually gives you complete control.
 * 
 * This object is converted to JSON and shared with the frontend to generate the client.
 */
export const openApiSpec = {
    openapi: '3.0.0',
    info: {
        title: 'Task Management API',
        version: '1.0.0',
        description: 'A simple task management API demonstrating OpenAPI integration with full-stack development',
    },
    servers: [
        {
            url: 'http://localhost:4000',
            description: 'Development server',
        },
    ],
    // 🔹 PATHS: Define all your API endpoints here
    paths: {
        '/api/tasks': {
            get: {
                summary: 'Get all tasks',
                description: 'Retrieve a list of all tasks, optionally filtered by status',
                tags: ['Tasks'], // Tags help organize endpoints in clients/docs
                parameters: [
                    {
                        name: 'status',
                        in: 'query', // Query parameter: ?status=pending
                        description: 'Filter tasks by status',
                        required: false,
                        schema: {
                            type: 'string',
                            enum: ['pending', 'in-progress', 'completed'],
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'List of tasks',
                        content: {
                            'application/json': {
                                schema: {
                                    type: 'array',
                                    // Reference to the shared schema defined below
                                    items: { $ref: '#/components/schemas/Task' },
                                },
                            },
                        },
                    },
                },
            },
            post: {
                summary: 'Create a new task',
                tags: ['Tasks'],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            // Uses CreateTask schema (subset of Task)
                            schema: { $ref: '#/components/schemas/CreateTask' },
                        },
                    },
                },
                responses: {
                    '201': {
                        description: 'Task created successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Task' },
                            },
                        },
                    },
                    '400': {
                        description: 'Invalid input',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
        },
        '/api/tasks/{id}': {
            get: {
                summary: 'Get task by ID',
                tags: ['Tasks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path', // Path parameter: /api/tasks/123
                        required: true,
                        description: 'Task ID',
                        schema: {
                            type: 'string',
                            format: 'uuid',
                        },
                    },
                ],
                responses: {
                    '200': {
                        description: 'Task details',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Task' },
                            },
                        },
                    },
                    '404': {
                        description: 'Task not found',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Error' },
                            },
                        },
                    },
                },
            },
            put: {
                summary: 'Update task',
                tags: ['Tasks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Task ID',
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                requestBody: {
                    required: true,
                    content: {
                        'application/json': {
                            schema: { $ref: '#/components/schemas/UpdateTask' },
                        },
                    },
                },
                responses: {
                    '200': {
                        description: 'Task updated successfully',
                        content: {
                            'application/json': {
                                schema: { $ref: '#/components/schemas/Task' },
                            },
                        },
                    },
                    '404': { description: 'Task not found' },
                    '400': { description: 'Invalid input' },
                },
            },
            delete: {
                summary: 'Delete task',
                tags: ['Tasks'],
                parameters: [
                    {
                        name: 'id',
                        in: 'path',
                        required: true,
                        description: 'Task ID',
                        schema: { type: 'string', format: 'uuid' },
                    },
                ],
                responses: {
                    '204': { description: 'Task deleted successfully' },
                    '404': { description: 'Task not found' },
                },
            },
        },
    },
    // 🔹 COMPONENTS: Reusable schemas
    // These match perfectly with our Zod schemas in schemas.ts
    components: {
        schemas: {
            Task: {
                type: 'object',
                required: ['id', 'title', 'status', 'priority', 'createdAt', 'updatedAt'],
                properties: {
                    id: { type: 'string', format: 'uuid', description: 'Unique task identifier', example: '123e4567-e89b-12d3-a456-426614174000' },
                    title: { type: 'string', minLength: 1, maxLength: 100, description: 'Task title', example: 'Complete project documentation' },
                    description: { type: 'string', maxLength: 500, description: 'Task description', example: 'Write comprehensive documentation for the OpenAPI demo project' },
                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'], description: 'Current task status', example: 'in-progress' },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'], description: 'Task priority level', example: 'high' },
                    createdAt: { type: 'string', format: 'date-time', description: 'Task creation timestamp', example: '2024-01-23T10:30:00Z' },
                    updatedAt: { type: 'string', format: 'date-time', description: 'Last update timestamp', example: '2024-01-23T11:45:00Z' },
                },
            },
            CreateTask: {
                type: 'object',
                required: ['title'],
                properties: {
                    title: { type: 'string', minLength: 1, maxLength: 100, description: 'Task title', example: 'New task' },
                    description: { type: 'string', maxLength: 500, description: 'Task description', example: 'Task details here' },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'], description: 'Task priority level', default: 'medium', example: 'medium' },
                },
            },
            UpdateTask: {
                type: 'object',
                properties: {
                    title: { type: 'string', minLength: 1, maxLength: 100 },
                    description: { type: 'string', maxLength: 500 },
                    status: { type: 'string', enum: ['pending', 'in-progress', 'completed'] },
                    priority: { type: 'string', enum: ['low', 'medium', 'high'] },
                },
            },
            Error: {
                type: 'object',
                properties: {
                    error: { type: 'string', description: 'Error message' },
                    details: { type: 'object', description: 'Additional error details' },
                },
            },
        },
    },
};
