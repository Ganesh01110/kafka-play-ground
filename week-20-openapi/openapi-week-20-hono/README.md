```
npm install
npm run dev
```

```
npm run deploy
```

routes
swagger page -> http://localhost:8787/ui
user ->  http://localhost:8787/user/4567
docs ->  http://localhost:8787/doc


generate generated client folder from spec.json

npx openapi-typescript-codegen --input ./spec.json --output ./generated

explore client

cd generated
cat index.ts