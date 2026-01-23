import fs from 'fs';
import path from 'path';
import { openApiSpec } from './openapi';

/**
 * 🔹 SPEC GENERATION SCRIPT
 * 
 * This script runs as a separate build step (npm run generate-spec).
 * 
 * WHY IS THIS NEEDED?
 * The frontend generation tool (openapi-typescript-codegen) needs a physical JSON file
 * to read the contract. It cannot import the TypeScript object directly.
 * 
 * FLOW:
 * 1. Import the 'openApiSpec' object (Source of Truth)
 * 2. Convert it to a JSON string
 * 3. Write it to the 'shared' folder where the frontend can see it
 */

const specPath = path.join(__dirname, '../../shared/openapi.json');
fs.writeFileSync(specPath, JSON.stringify(openApiSpec, null, 2));

console.log('✅ OpenAPI spec generated at:', specPath);
