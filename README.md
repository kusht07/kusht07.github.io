# JS Dev Monorepo

This monorepo project demonstrates how to set up a JavaScript development environment using Nx for an Organization and have apps of varied stack.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Setup](#setup)
3. [Creating Applications](#creating-applications)
4. [Running Applications](#running-applications)

## Prerequisites

Before you begin, ensure you have Node.js and npm installed on your system.

## Setup

1. **Install Nx globally**

   If you haven't already, install Nx globally:

   ```bash
   npm install -g nx
   ```

2. **Create a new Nx workspace**

   Set up a new Nx workspace:

   ```bash
   npx create-nx-workspace@latest my-nx-monorepo
   ```

   When prompted for the type of application, choose "empty".

3. **Navigate to the project directory**

   Change to the newly created project directory:

   ```bash
   cd my-nx-monorepo
   ```

4. **Add necessary plugins**

   Install the required plugins for React, NestJS, and Express:

   ```bash
   npm install --save-dev @nrwl/react @nrwl/nest @nrwl/express
   ```

## Creating Applications

5. **Generate a React app**

   Create a new React application within the monorepo:

   ```bash
   nx g @nrwl/react:app react-app
   ```

6. **Generate a NestJS app**

   Create a new NestJS application:

   ```bash
   nx g @nrwl/nest:app nest-app
   ```

7. **Generate an Express app**

   Create a new Express application:

   ```bash
   nx g @nrwl/express:app express-app
   ```

## Running Applications

To run any of the applications, use the following command:

```bash
nx serve [app-name]
```

For example:
- To run the React app: `nx serve react-app`
- To run the NestJS app: `nx serve nest-app`
- To run the Express app: `nx serve express-app`

You can now start developing your applications within this monorepo structure. Happy coding!