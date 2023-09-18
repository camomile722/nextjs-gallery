## Getting Started

First, install all dependencies and run the dev server:

```bash
yarn install && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.ts`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed
on [http://localhost:3000/api/images](http://localhost:3000/api/images). This endpoint can be edited
in `pages/api/images.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated
as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Project overview

The project is work in progress and will be continuously updated and maintained.

These are the following frameworks and libraries in the template:

-   Next.js
-   Redux Toolkit
-   Typescript
-   Chakra UI
-   Framer Motion
-   Storybook (Testing library, a11y, actions, essentials)
-   Jest
-   Cypress
-   Prettier
-   Eslint
-   Husky

## Workflow

Run `yarn dev` in order to start the development server. You will start from the Login Page to start register flow. The
transition from register flow to investor flow has not been implemented yet. The API currently has no User Login
Endpoint.

## Storybook

Run `yarn storybook` to start Storybook.

## Husky

Husky will lint and format your files before each commit.
