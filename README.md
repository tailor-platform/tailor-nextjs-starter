# tailor-nextjs-starter <!-- omit in toc -->

This is a base [Next.js](https://nextjs.org/) application to get you started developing a frontend for your Tailor application.

## Table of Contents <!-- omit in toc -->

- [Features](#features)
- [Requirement](#requirement)
- [Structure](#structure)
  - [Components](#components)
- [Getting Started](#getting-started)
  - [Setup](#setup)
  - [Run](#run)
- [Codegen](#codegen)
- [Styled systems](#styled-systems)


## Features

- [Next.js](https://nextjs.org/) with App Router support
- Type checking with [TypeScript](https://www.typescriptlang.org/)
- [Prettier](https://prettier.io/) for code formatting
- Opinionated preset pack by Tailor ([@tailor-platform/dev-config](https://www.npmjs.com/package/@tailor-platform/dev-config)) that has config for ESLint, TypeScript (tsconfig), and prettier
- [@apollo/client](https://www.npmjs.com/package/@apollo/client) for GraphQL client
- [graphql-codegen](https://the-guild.dev/graphql/codegen) to auto-generate code based on your Tailor application's GraphQL schema and operations
- Datagrid library by Tailor ([@tailor-platform/datagrid](https://www.npmjs.com/package/@tailor-platform/datagrid))
- Design System components by Tailor ([@tailor-platform/datagrid](https://www.npmjs.com/package/@tailor-platform/design-systems))
- Headless UI components by [ArkUI](https://ark-ui.com/) that gives more customizability to design-systems
- [PandaCSS](https://panda-css.com/) for recipes and theming for design-systems

## Requirement

* Node.js 18+ and pnpm

## Structure

```
.
├── README.md                     # README file
├── codegen.ts                    # Configuration for graphql-codegen
├── next.config.js                # Next.js configuration
├── panda.config.ts               # PandaCSS configuration
├── pnpm-lock.yaml                # Lockfile for pnpm
├── postcss.config.js             # PostCSS configuration (generated by Next.js)
├── public                        # Public asset folder
├── src
│   ├── app                       # Next.js app (App Router)
│   ├── components                # Components directory (see the following section)
│   ├── graphql
│   │   ├── schema.generated.ts   # TypeScript code using apollo-client generated by graphql-codegen
│   │   └── schema.graphql        # GraphQL schema that contains GQL operations to generate by graphql-codegen
│   ├── hooks                     # A directory to place React hooks
│   ├── libs                      # General utilities
│   ├── modules                   # Domain specific utilities
│   ├── styles                    # App-wide styles
│   └── types
│       └── graphql.ts            # Generated GQL schema definitions in TypeScript which is imported from graphql/schema.generated.ts
└── tsconfig.json                 # TypeScript configuration
```

### Components

Our starter adopts Atomic-Design like structure under `components` directory. This is our recommendation, but optional to be used.

```
components
├── atoms         # Atomic, smallest components
├── forms         # Form related components
├── organisms     # Components consist of multiple atoms
├── providers     # Provider components
└── templates     # Components that layouts the partial or the whole pages
```

## Getting Started

Run the following command on your local environment:

```
git clone --depth=1 https://github.com/tailor-platform/tailor-nextjs-starter.git your-project-name
```

### Setup

Enable Corepack to use [pnpm](https://pnpm.io/) as a package manager.

```
corepack enable && corepack enable npm
```

Install the dependencies:

```bash
pnpm install
```

### Run

Then, you can now start your development server with:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Codegen

This project starter is configured to use graphql-codegen which generates TypeScript code from GQL schema definition (`src/graphql/schema.graphql`)

Save your GraphQL queries and mutations in `src/graphql/schema.graphql`. Then, run the codegen script:

```bash
pnpm run codegen
```

By the preset in this starter, the command above will generate the two files as follows:

* `src/types/graphql.ts` ... a file with TypeScript definition of GraphQL schema
* `src/graphql/schema.generated.ts` ... a file with a set of functions to call your Tailor application's API easily. 
  * This file is expected to be imported from pages/components to query data from and mutate data on GraphQL API backend.

Recommnded to see [the tutorial for graphql-codegen](https://www.apollographql.com/tutorials/lift-off-part1/09-codegen) if you are not really familiar with it.

## Styled systems

As this starter enables [`emitPackage`](https://panda-css.com/docs/references/config#emitpackage), the styling components generated by PandaCSS are placed as a package named as `@tailor-platform/styled-system/jsx`.

`@tailor-platform/styled-systems/jsx` contains JSX components that are useful in layouting components such as [`Box`](https://storybook.tailor.tech/?path=/docs/layout-box--docs), [`Container`](https://storybook.tailor.tech/?path=/docs/layout-container--docs), [`Stack`](https://storybook.tailor.tech/?path=/docs/layout-stack--docs), and more. You can browse available components on [our Storybook](https://storybook.tailor.tech/).
