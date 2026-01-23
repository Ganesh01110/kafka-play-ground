/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CreateTask } from '../models/CreateTask';
import type { Task } from '../models/Task';
import type { UpdateTask } from '../models/UpdateTask';

import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class TasksService {

    /**
     * Get all tasks
     * Retrieve a list of all tasks, optionally filtered by status
     * @param status Filter tasks by status
     * @returns Task List of tasks
     * @throws ApiError
     */
    public static getApiTasks(
status?: 'pending' | 'in-progress' | 'completed',
): CancelablePromise<Array<Task>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks',
            query: {
                'status': status,
            },
        });
    }

    /**
     * Create a new task
     * Create a new task with title, description, and priority
     * @param requestBody 
     * @returns Task Task created successfully
     * @throws ApiError
     */
    public static postApiTasks(
requestBody: CreateTask,
): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/tasks',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
            },
        });
    }

    /**
     * Get task by ID
     * Retrieve a specific task by its ID
     * @param id Task ID
     * @returns Task Task details
     * @throws ApiError
     */
    public static getApiTasks1(
id: string,
): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Task not found`,
            },
        });
    }

    /**
     * Update task
     * Update an existing task
     * @param id Task ID
     * @param requestBody 
     * @returns Task Task updated successfully
     * @throws ApiError
     */
    public static putApiTasks(
id: string,
requestBody: UpdateTask,
): CancelablePromise<Task> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Invalid input`,
                404: `Task not found`,
            },
        });
    }

    /**
     * Delete task
     * Delete a task by ID
     * @param id Task ID
     * @returns void 
     * @throws ApiError
     */
    public static deleteApiTasks(
id: string,
): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/tasks/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Task not found`,
            },
        });
    }

}
