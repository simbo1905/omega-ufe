# Omega-µfe Microfrontends Architecture

This repo is following Readme-Driven Development with LLM Codegen. Until you see tagged releases, what is below is aspirational. See the article at [My LLM Code Generation Workflow (for now)](https://dev.to/simbo1905/my-llm-code-generation-workflow-for-now-1ahj) that explains this readme in git is for `aider` to understand what we are building. 

## Commands

Run the graphql codegen:

```shell
npm run codegen
```

Run the data access layer tests:

```shell
npx ts-node packages/dal/src/__tests__/client-runner.ts 
```

## Overview

This monorepo implements a decoupled microfrontend architecture called Omega-µfe.

we use using **Svelte**, **TypeScript**, and **GraphQL** to demonstrate how to use modern 
browser APIs to avoid heavy frameworks. Key goals include:

- Decoupling frontend components via **custom elements** and **import maps**
- Managing state with **immutable Svelte stores** using **Immer** for deep immutability
- Enabling cross-component communication through **domain events**
- Ensuring **type safety** and **schema compatibility** between GraphQL backends and Svelte frontends

## Key Architectural Components

### 1. **State Management Strategy**

- **Immutable Stores**: Svelte stores enhanced with Immer for deep immutability (`userStore`, `dataStore`)
- **Derived Stores**: Computed values from immutable stores, ensuring consistency
- **Domain Event Flow**: Microfrontends dispatch domain events, decoupling UI from data operations

### 2. **Schema Evolution & Versioning**

- **TypeScript Types**: Generated from GraphQL schemas using `graphql-codegen`
- **CI/CD Validation**: Schema checks in pipelines to ensure frontend/backend compatibility
- **Backward Compatibility**: GraphQL's additive nature allows gradual schema updates

### 3. **Cross-Microfrontend Communication**

- **Domain Events**: Decentralized communication using typed domain events
- **Centralized Logging**: Capture domain events for debugging and observability


## Implementation Details

### Type Safety & Tooling

Generate TypeScript types from GraphQL schema

```shell
npx graphql-codegen --config codegen.yml
text
- **Example `codegen.yml`**:
schema: "http://localhost:4000/graphql"
documents: "./src/**/*.graphql"
generates:
./src/generated/types.ts:
plugins:
- "typescript"
- "typescript-operations"
```

### Svelte Integration with Immer

```typescript
/ Example: Immutable store using Immer
import { writable } from 'svelte/store';
import { produce } from 'immer';
// Create base writable store
const createImmerStore = <T>(initialState: T) => {
const { subscribe, set, update } = writable<T>(initialState);
return {
subscribe,
set,
// Use Immer's produce for immutable updates
update: (fn: (state: T) => void) => update(state => produce(state, fn))
};
};
// Example store
export const userStore = createImmerStore({ name: '', id: '', role: '' });
// Usage in component
userStore.update(state => {
state.name = "New Name"; // Looks mutable but creates immutable update
});
```

### Domain Event Communication

```typescript
// Dispatch domain event from a microfrontend
// Using BroadcastChannel API (implementation detail)
const channel = new BroadcastChannel("domain_events");
channel.postMessage({
type: "USER_SELECTED",
payload: { userId: "123" }
});
// Data Access Layer listens for domain events
channel.onmessage = (event) => {
const { type, payload } = event.data;
if (type === "USER_SELECTED") {
// Translate domain event to data operation
dataAccessLayer.fetchUser(payload.userId);
}
};
```

## Architectural Roles

### 1. **Microfrontends**

- Pure UI components that render data from stores
- Dispatch domain events in response to user interactions
- Implemented as custom elements with clear boundaries

### 2. **Data Access Layer (DAL)**

- Listens for domain events
- Translates domain events to GraphQL operations
- Updates immutable stores with query results

### 3. **Domain Event Dispatcher**

- Lightweight mechanism for sending domain events
- Implementation detail using BroadcastChannel API
- Provides type safety for event payloads

### 4. **Immutable Store Registry**

- Collection of Immer-enhanced Svelte stores
- Provides deep immutability for complex state
- Ensures predictable state transitions

## Schema Evolution Best Practices

1. **Avoid Breaking Changes**: Prefer adding fields over renaming/removing
2. **Deprecate Strategically**:

```typescript
type Product {
oldField: String @deprecated(reason: "Use newField instead")
newField: String!
}
```

3. **Lightweight BFF*:

Use a Backend-For-Frontend layer to aggregate microservices using Schema Stitching (never invasive Federation)

## Benefits Achieved

- **Decoupled Teams**: Microfrontends evolve independently
- **Predictable State**: Immer ensures immutable updates without boilerplate
- **Type Safety**: TypeScript guards against schema mismatches
- **Flexible Upgrades**: Gradual schema adoption without monolithic locks

## Immmutable Stores with Immer

We're creating a system to handle GraphQL data in Svelte that:
Keeps your data immutable (prevents accidental mutations)
Makes updating nested data easy (without the usual headache)
Works well with TypeScript

Object.freeze() in Development

```Javascript
if (import.meta.env.DEV) {
  Object.freeze(initialState)
}
```

In simple terms: This is just a safety check during development. It "locks" your data so if you accidentally try to modify it directly (instead of using the proper methods), JavaScript will throw an error. It's like putting training wheels on your code while developing.
In production: This check is skipped for better performance.

Here's the practical, stripped-down approach:

Create your store with Immer:

```typescript
// stores/user-store.ts
import { writable } from 'svelte/store'
import { produce } from 'immer'
import type { UserData } from '../types'

// Create a store with initial data
const createUserStore = () => {
  const { subscribe, update } = writable<UserData>({ user: null })
  
  return {
    subscribe,
    // This is the key method you'll use to update data
    update: (fn: (draft: UserData) => void) => {
      update(state => produce(state, fn))
    }
  }
}

export const userStore = createUserStore()
```

Use it in your Svelt components:

```typescript
// In a Svelte component
import { userStore } from '../stores/user-store'

// When you get data from GraphQL
onMount(async () => {
  const result = await graphqlClient.query({
    query: USER_QUERY,
    variables: { id: "123" }
  })
  
  // Update the store with the result
  userStore.update(draft => {
    draft.user = result.data.user
  })
})

// Later, when you need to update something deeply nested
function updateCommentText(postId, commentId, newText) {
  userStore.update(draft => {
    // Without Immer, this would be a nightmare
    const post = draft.user.posts.find(p => p.id === postId)
    const comment = post?.comments.find(c => c.id === commentId)
    if (comment) {
      comment.text = newText // This looks like direct mutation but Immer makes it safe
    }
  })
}
```

That's it! The beauty is in the simplicity - you write code that looks like you're directly changing objects, but behind the scenes Immer creates proper immutable updates.

## Demo Project Strucure

```text
.
├── packages/
│   ├── shell/           # Container app
│   ├── mfe-home/        # Svelte microfrontend
│   ├── mfe-dashboard/   # Another Svelte MF
│   ├── shared-utils/    # Pure TS utilities
│   ├── model/           # GraphQL schema + codegen
│   └── dal/             # Apollo Client instance
├── package.json
└── tsconfig.base.json   # Base TypeScript config
```

## Essential Configuration

```json
# Root package.json
{
  "name": "monorepo",
  "workspaces": [
    "packages/*"
  ],
  "scripts": {
    "build": "npm run build --workspaces",
    "codegen": "npm run codegen --workspace=model"
  }
}
```

##  Model Package Setup (GraphQL Codegen):

```shell
cd packages/model
npm init -y
npm install @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations
```

```yaml
# codegen.yml
schema: "./schema.graphql"
generates:
  ./src/generated-types.ts:
    plugins:
      - "typescript"
      - "typescript-operations"
    config:
      immutableTypes: true
      enumsAsTypes: true
```

## DAL Package (Apollo Client):

```shell
cd packages/dal
npm init -y
npm install @apollo/client graphql immer
```

```typescript
// packages/dal/src/client.ts
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { GeneratedTypes } from 'model'; // Import from your model package

export const client = new ApolloClient({
  uri: 'YOUR_GRAPHQL_ENDPOINT',
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Use generated types here
          yourField: {
            merge(existing: GeneratedTypes.YourType, incoming: GeneratedTypes.YourType) {
              return { ...existing, ...incoming };
            }
          }
        }
      }
    }
  })
});
```

## Svelte Microfrontend Setup:

```shell
cd packages/mfe-home
npm init -y
npm install svelte @sveltejs/vite-plugin-svelte
```

```javascript
// svelte.config.js
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

export default {
  preprocess: vitePreprocess(),
  compilerOptions: {
    customElement: true
  }
};
```

Shared TypeScript Config:

```typescript
// tsconfig.base.json
{
  "compilerOptions": {
    "strict": true,
    "moduleResolution": "node",
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  }
}
```

VS Code Workspace Settings (.vscode/settings.json):

```json
{
  "eslint.validate": [
    "svelte",
    "typescript"
  ],
  "prettier.enable": true,
  "typescript.tsdk": "node_modules/typescript/lib",
  "svelte.enable-ts-plugin": true
}
```

Build Pipeline:

```json
# In model/package.json
"scripts": {
  "codegen": "graphql-codegen --config codegen.yml"
}

# In each Svelte MF package.json
"scripts": {
  "build": "vite build"
}

# In shared-utils package.json
"scripts": {
  "build": "tsc"
}

```

## Development Workflow:

Start codegen watcher:

```shell
npm run codegen -- --watch
```

Use npm link for local package dependencies:

```shell
cd packages/model
npm link

cd ../dal
npm link model
```

Debugging Setup (.vscode/launch.json):

```
{
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5500/packages/shell",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Common Mistakes to Avoid:

1. Missing Peer Dependencies: Always run npm install in each package after linking
2. Type Resolution Issues: Use paths in tsconfig.json for cross-package imports
3. GraphQL Schema Versioning: Commit generated types but keep schema.graphql as source of truth
4. Custom Element Conflicts: Prefix all Svelte components with unique names (e.g. mfe-home-card)
