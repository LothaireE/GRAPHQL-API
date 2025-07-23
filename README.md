# BASE-API

A basic RESTful API built with **Node.js**, **Express**, and **TypeScript**.

## Basic routes setup :

-   **Main routes**: only here to perform a quick healthcheck. Copy and use them
    as a starting point.

-   **Auth routes**: Handcrafted minimal validation logic. Replace this with a
    proper validation library of your choice (zod, joi, etc).

-   **Book routes**: serve as an example of standard CRUD operations backed by
    MongoDB using the generic middlewares. Can be used as a template to define
    other resource routes in a modular way.

The example is specific to books here but this architectural pattern can be
applied to any resource (authors, users, super heroes or even dare I say...
Pokemen).

## Features

-   Modular project structure using TypeScript
-   Custom logging middleware
-   `.env` file support for configuration
-   Development workflow with `nodemon` / `ts-node-dev`
-   Build scripts using the TypeScript compiler
-   Test coverage reports using Jest

---

## Installation

```bash
git clone https://github.com/LothaireE/BASE-API.git
cd BASE-API
npm install
npm install -g nodemon ts-node typescript
```

## Usage

Start the development server:

```bash
npm run dev
```

or

```bash
nodemon src/server.ts
```

Build the project for production:

```bash
npm run build
```

Start the production server:

```bash
npm start
```

## Test Coverage Report

After running the tests with coverage:

```bash
npm run test
```

A detailed HTML coverage report is generated in:

```bash
 ~/BASE-API/coverage/lcov-report/index.html
```

To view it:

Copy the path of it, open your browser and paste it directly into the search
bar:

    file:///absolute/path/to/BASE-API/coverage/lcov-report/index.html

You will see a visual, navigable coverage report for your codebase.

## Environment Variables

Duplicate `.env.example` file in the root directory, rename it `.env` and add
your own variables to it following example below:

```env
SERVER_PORT=3000
SERVER_HOSTNAME="localhost"
and so on
```

## Mongoose & access Middlewares

This API uses [Mongoose] to interact with MongoDB (NoSQL database),  
but thanks to abstraction via middlewares, it can be easily replaced by any
other data service.

To simplify CRUD operations, a series of **generic middlewares** has been
implemented. This allows database access to be factored and standardized.

### Generic Middlewares available

| Middleware           | Description                              |
| -------------------- | ---------------------------------------- |
| `MongoCreate(model)` | Create a document from `req.body`        |
| `MongoGet(model)`    | Retrieve a document from `req.params.id` |
| `MongoGetAll(model)` | Retrieve all documents                   |
| `MongoUpdate(model)` | Update a document from `req.body`        |
| `MongoDelete(model)` | Remove a document from `req.params.id`   |
| `MongoQuery(model)`  | Execute a request based on `req.body`    |

---

Abstracting database operations (CRUD) into dedicated middlewares ensures:

-   **Separation of concerns** between routing, application logic and data
    access
-   **Code reuse** across different endpoints and models
-   **Simplified unit testing**
-   **Loose coupling to Mongoose** allowing greater modularity

This makes the system **modular**, **maintainable**, **extensible** and route
controllers remain unchanged.

### Controllers

Each route delegates the actual request handling to a **Controller class**,
where the application logic resides. Using class-based controllers (with static
methods) helps organize all the logic for a given resource in one place.

For example, healthcheck endpoints are implemented inside a `HealthController`
class:

```ts
class HealthController {
    static healthCheck(req: Request, res: Response) {
        res.status(200).json({ message: 'API is running' });
    }
}
```
