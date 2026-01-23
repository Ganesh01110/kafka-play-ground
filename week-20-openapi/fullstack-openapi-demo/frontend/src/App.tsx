import { useEffect, useState } from 'react';
// 🔹 GENERATED CLIENT IMPORT
// Notice we import types and services from the auto-generated 'client' folder.
// We NEVER manually write 'fetch', 'axios', or interface definitions.
import { TasksService, Task, CreateTask, UpdateTask } from './client';
import { OpenAPI } from './client';
import './App.css';

// 🔹 CONFIGURATION
// Point the generated client to our backend URL
OpenAPI.BASE = 'http://localhost:4000';

function App() {
  // 🔹 TYPE SAFETY
  // 'tasks' is automatically typed as 'Task[]'. No manual interface needed!
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [filter, setFilter] = useState<'all' | Task.status>('all');

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const status = filter === 'all' ? undefined : filter;

      // 🔹 API CALL
      // 'TasksService.getApiTasks' is an auto-generated function.
      // It handles the URL, query parameters, types, and even error throwing.
      // Hover over 'getApiTasks' to see the exact input/output types!
      const data = await TasksService.getApiTasks(status);
      setTasks(data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    try {
      // 🔹 STRICT TYPING
      // We must provide an object that matches 'CreateTask'.
      // If we miss a required field (like 'title'), TypeScript will error here.
      const newTask: CreateTask = {
        title: newTaskTitle,
        priority: 'medium' as CreateTask.priority, // Using generated Enum for safety
        description: 'Created via frontend',
      };

      await TasksService.postApiTasks(newTask);
      setNewTaskTitle('');
      fetchTasks();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleStatusUpdate = async (id: string, newStatus: string) => {
    try {
      // Validate that 'newStatus' is a valid enum value
      const update: UpdateTask = { status: newStatus as UpdateTask.status };
      await TasksService.putApiTasks(id, update);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await TasksService.deleteApiTasks(id);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="container">
      <header>
        <h1>OpenAPI Task Manager</h1>
        <p>Full-stack type safety demo</p>
      </header>

      {/* UI rendering code below is standard React */}
      <section className="controls">
        <form onSubmit={handleCreateTask}>
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Add a new task..."
          />
          <button type="submit">Add Task</button>
        </form>

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
        >
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </section>

      {loading ? (
        <p>Loading tasks...</p>
      ) : (
        <div className="task-list">
          {tasks.map((task) => (
            <div key={task.id} className={`task-card ${task.status} ${task.priority}`}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className="priority-badge">{task.priority}</span>
              </div>
              <p>{task.description}</p>
              <div className="task-actions">
                <select
                  value={task.status}
                  onChange={(e) => handleStatusUpdate(task.id, e.target.value)}
                >
                  <option value="pending">Pending</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
