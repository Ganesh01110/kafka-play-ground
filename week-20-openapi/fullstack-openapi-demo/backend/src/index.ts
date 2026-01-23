import express, { Request, Response } from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { openApiSpec } from './openapi';
import { TaskSchema, CreateTaskSchema, UpdateTaskSchema, Task } from './schemas';
import { randomUUID } from 'crypto';

/**
 * 🔹 BACKEND SERVER
 * 
 * This is a standard Express application.
 * Key responsibilities:
 * 1. Serve the API endpoints
 * 2. Validate input using Zod
 * 3. Host the Swagger UI documentation
 * 4. Serve the raw OpenAPI JSON for other tools to consume
 */

const app = express();
const PORT = 4000;

// Middleware
app.use(cors()); // Allow frontend to call backend
app.use(express.json()); // Parse JSON bodies

// In-memory database (reset on restart)
let tasks: Task[] = [
    {
        id: randomUUID(),
        title: 'Learn OpenAPI',
        description: 'Understand how OpenAPI works in full-stack development',
        status: 'in-progress',
        priority: 'high',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: randomUUID(),
        title: 'Build demo project',
        description: 'Create a full-stack demo with OpenAPI integration',
        status: 'pending',
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

// 🔹 API ROUTES

app.get('/api/tasks', (req: Request, res: Response) => {
    const { status } = req.query;

    let filteredTasks = tasks;
    if (status && typeof status === 'string') {
        filteredTasks = tasks.filter(task => task.status === status);
    }

    res.json(filteredTasks);
});

app.post('/api/tasks', (req: Request, res: Response) => {
    try {
        // 🔹 VALIDATION
        // We validating the input strictly against our Schema.
        // If 'req.body' doesn't match 'CreateTaskSchema', this throws an error.
        const validatedData = CreateTaskSchema.parse(req.body);

        const newTask: Task = {
            id: randomUUID(),
            title: validatedData.title,
            description: validatedData.description,
            status: 'pending',
            priority: validatedData.priority || 'medium',
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error: any) {
        res.status(400).json({
            error: 'Invalid input',
            details: error.errors // Return detailed validation errors
        });
    }
});

app.get('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const task = tasks.find(t => t.id === id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
});

app.put('/api/tasks/:id', (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const taskIndex = tasks.findIndex(t => t.id === id);

        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }

        // Validate partial update data
        const validatedData = UpdateTaskSchema.parse(req.body);

        tasks[taskIndex] = {
            ...tasks[taskIndex],
            ...validatedData,
            updatedAt: new Date().toISOString(),
        };

        res.json(tasks[taskIndex]);
    } catch (error: any) {
        res.status(400).json({
            error: 'Invalid input',
            details: error.errors
        });
    }
});

app.delete('/api/tasks/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const taskIndex = tasks.findIndex(t => t.id === id);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

// 🔹 SWAGGER CONFIGURATION

// 1. Interactive UI at /api-docs
// This allows developers to test endpoints directly in the browser
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openApiSpec));

// 2. Raw JSON Spec at /api/openapi.json
// This endpoint is critical! It allows standard tools (and our frontend generator)
// to fetch the contract and generate code.
app.get('/api/openapi.json', (req: Request, res: Response) => {
    res.json(openApiSpec);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📚 API Docs available at http://localhost:${PORT}/api-docs`);
    console.log(`📄 OpenAPI Spec at http://localhost:${PORT}/api/openapi.json`);
});
