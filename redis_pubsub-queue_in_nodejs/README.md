# redis_pubsub-queue_in_nodejs
it is an implementation of pubsub and queue structure with redis and node js with a simple server and scalable worker model

-> Redis-based Code Submission Processor

This project is a system designed to handle code submissions through a REST API and process them asynchronously using a Redis-backed queue. It consists of two main components:
- **Server**: Receives code submissions via an API.
- **Worker**: Processes the code submissions from the Redis queue.

## Features

- Submissions are queued in Redis for asynchronous processing.
- The worker continuously listens for and processes submissions from the queue.
- Scalable architecture, allowing multiple workers to process submissions concurrently.

## Technologies Used

- **Node.js**: JavaScript runtime for the server and worker.
- **Express.js**: Lightweight web framework for building APIs.
- **Redis**: In-memory data structure store used as a message queue.
- **TypeScript**: Provides static typing to make development more reliable.

## Prerequisites

To run this project, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **Redis** (running locally or remotely)
- **Docker** (optional, if you prefer running Redis in a container)

## Getting Started

### 1. Clone the Repository

```
git clone https://github.com/Ganesh01110/redis_pubsub-queue_in_nodejs.git
cd redis_pubsub-queue_in_nodejs
```
### 2. Install Dependencies
Navigate to the respective directories to install the required dependencies:
```
# Install server dependencies
cd server
npm install

# Install worker dependencies
cd ../worker
npm install

```

### 3. Start Redis
You can start Redis either locally or via Docker:

Run Redis locally (if installed on your machine):
```
redis-server
```
Run Redis using Docker:
```
docker run --name my-redis -d -p 6379:6379 redis
```
connecting to container
```
docker exec -it container_id /bin/bash
```
Connecting to the redis cli
```
redis-cli
```
### 4. Running the Project
 ## Start the Server
The server listens on port 3000 and provides an endpoint for code submission:
```
cd express-server
npm run start
 ```
or
## bulid the Server locally
```
tsc -b
node dist/index.js
```

 ## Start the Worker
The worker listens for tasks on the Redis queue and processes the submissions:
```
cd worker
npm run start
 ```
or

 ## build the Worker
 ```
tsc -b
node dist/index.js
```
create multiple build i.e clusters of worker to see work distribuition.

### 5. Submitting Code
To submit a code snippet for processing, send a POST request to the following endpoint:
```
POST http://localhost:3000/submit
 ```

With the following JSON payload:
```json
{
  "problemId": "1",
  "code": "your_code_here",
  "language": "cpp",
  "userId": 1
}

```
You can use a tool like Postman or curl to test this. Example using curl:
```
curl -X POST http://localhost:3000/submit \
    -H 'Content-Type: application/json' \
    -d '{"problemId":"1", "code":"your_code_here", "language":"cpp", "userId":1}'

```

## How It Works
1.Server:

Receives a code submission via the /submit endpoint.
Pushes the submission onto a Redis list (problems queue).

2.Worker:

Listens for new submissions from the Redis list.
Processes each submission by parsing the request and logging the code and language.
This setup can easily be extended with additional processing logic (e.g., executing, validating, or grading the code).

## Error Handling
Both the server and worker handle Redis connection errors and submission processing errors. You can extend the error-handling logic as needed, such as logging to a file or adding retries for failed submissions.

## Customization
You can add your own logic for executing or validating code inside the processSubmission function located in worker/src/index.ts.

## Contributing
Contributions are welcome! Feel free to open a pull request or an issue if you have any suggestions or improvements.

## License
This project is licensed under the MIT License. See the LICENSE file for more details.

### Key Sections:
1. **Introduction**: Describes the purpose and components of the project.
2. **Features**: Highlights the key functionality.
3. **Technologies Used**: Lists the core technologies.
4. **Prerequisites**: Mentions required tools to run the project.
5. **Getting Started**: Guides users on how to set up and run the project.
6. **Submitting Code**: Provides an example API request to submit code for processing.
7. **How It Works**: Explains the flow of data between the server, Redis, and the worker.
8. **Error Handling**: Mentions that error handling exists and can be extended.
9. **Customization**: Explains where to add new features or logic.
10. **Contributing**: Invites contributions to the project.
11. **License**: Mentions the MIT license.


