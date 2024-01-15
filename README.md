# tailor-nextjs-starter

This is a base [Next.js](https://nextjs.org/) application to get you started developing a frontend for your Tailor application.

## Features

- [Next.js](https://nextjs.org/) with App Router support
- Type checing with [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) for code formatting
- Opinionated ESLint rules by Tailor Technologies ([@tailor-platform/dev-config](https://www.npmjs.com/package/@tailor-platform/dev-config))
- [pnpm](https://pnpm.io) for package management.
- [graphql-codegen](https://the-guild.dev/graphql/codegen) to auto-generate code based on your Tailor application's GraphQL schema and operations.

## Getting Started

### Setup

Enable Corepack to use [pnpm](https://pnpm.io/) as a package manager.

```
corepack enable && corepack enable npm
```

Install the dependencies:

```bash
pnpm install
```

### Develop

Start the development server with:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Codegen

Save your GraphQL queries and mutations in one or more `.graphql` files.

Then, run the codegen script:

```bash
pnpm run codegen
```

This will result in the creation of the `src/graphqlTypes.ts` file that contains all the types from your Tailor application.

Additionally, for each `.graphql` file, a similarly named `.generated.graphql` file will be generated at the same location.
This file contains a set of functions to call your Tailor application's API easily.

The configuration for graphql-codegen is found in [codegen.ts](./codegen.ts).
