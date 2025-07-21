# BASE-API

A basic RESTful API built with **Node.js**, **Express**, and **TypeScript**.

## Basic routes setup :

-   Auth routes with handcraft minimal validation schemas(to replace with a
    proper library of your choice: zod, joi, etc)
-   Main routes

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
```
