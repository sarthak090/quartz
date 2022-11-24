# Quartzstone Frontend

This is a [React.js](https://reactjs.org/) frontend using [Next.js](https://nextjs.org/) for SSR and routing.

It uses [SASS](https://reactjs.org/) for styling.
It follows the steps outlined in the official [SASS docs](https://nextjs.org/docs/basic-features/built-in-css-support#sass-support) for Next.js integration.

## Development

To run a hot-reloading development server run the following command in the `frontend` directory

```bash
    yarn run dev
```

## Code Formatting

This project uses [Prettier](https://prettier.io/) to ensure code styling is consistent throughout the project and erroneous style changes do not muddy up commits.

You can install a [VS Code extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to run it using Format On Save, which should be enabled in this workshpace via the `.vscode/settings.json` file contained in this repo.

Additionally, [ESLint](https://eslint.org/) is installed, though it's rules will likely be modified as development continues.

Both of these tools are automatically run via [lint-staged](https://github.com/okonet/lint-staged) as a pre-commit hook to automatically fix style as well.

### Husky: Checking for errors, linting and formatting on commit

Another layer of safety by running eslint and prettier on each commit. That will make sure that every file you commit has no ESLint error and are correctly formatted. Also, you can run additional checks on commit, like TypeScript type-checking.

One way of achieving this is by using [Husky](https://typicode.github.io/husky), a little program that will run scripts for a given Git command.

You need to enable husky by running:

```bash
    yarn husky install
```

## Backend API

## Deployment

This repo will automatically deploy to Azure. More details to follow.

## Environment Variables

Next.js has built-in support for loading environment variables from `.env.local` into process.env.

An example `.env.local`:

```env
DB_HOST=localhost
DB_USER=myuser
DB_PASS=mypassword
```

This loads `process.env.DB_HOST`, `process.env.DB_USER`, and `process.env.DB_PASS` into the Node.js environment.

By default all environment variables loaded through `.env.local` are only available in the Node.js environment, meaning they won't be exposed to the browser.

In order to expose a variable to the browser you have to prefix the variable with `NEXT_PUBLIC_`. For example:

```env
NEXT_PUBLIC_ANALYTICS_ID=abcdefghijk
```

This loads `process.env.NEXT_PUBLIC_ANALYTICS_ID` into the Node.js environment automatically, allowing you to use it anywhere in your code. The value will be inlined into JavaScript sent to the browser because of the `NEXT_PUBLIC_` prefix. This inlining occurs at build time, so your various `NEXT_PUBLIC_` envs need to be set when the project is built.

To load default environment variables run the following command:

```bash
cp .env.example .env.local
```
