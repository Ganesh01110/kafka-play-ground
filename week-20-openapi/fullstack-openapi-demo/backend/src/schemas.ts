import { z } from 'zod';

/**
 * 🔹 SCHEMA DEFINITIONS
 * 
 * We use Zod for runtime validation and static type inference.
 * This ensures that data coming into our API matches exactly what we expect.
 * 
 * Why Zod?
 * 1. Runtime validation: Crashes early if data is wrong (good!)
 * 2. Type inference: We don't need to write separate TypeScript interfaces.
 */

// Schema for a full Task object (used for responses)
export const TaskSchema = z.object({
    id: z.string().uuid(),
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'in-progress', 'completed']),
    priority: z.enum(['low', 'medium', 'high']),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
});

// Schema for creating a new task (input validation)
export const CreateTaskSchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    // Default value allows client to omit this field
    priority: z.enum(['low', 'medium', 'high']).default('medium'),
});

// Schema for updating a task (all fields optional)
export const UpdateTaskSchema = z.object({
    title: z.string().min(1).max(100).optional(),
    description: z.string().max(500).optional(),
    status: z.enum(['pending', 'in-progress', 'completed']).optional(),
    priority: z.enum(['low', 'medium', 'high']).optional(),
});

// 🔹 TYPE INFERENCE
// TypeScript types are automatically derived from the Zod schemas.
// If we change the Zod schema, these types update automatically!
export type Task = z.infer<typeof TaskSchema>;
export type CreateTask = z.infer<typeof CreateTaskSchema>;
export type UpdateTask = z.infer<typeof UpdateTaskSchema>;
