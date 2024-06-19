# CarOpticom

## Requirements

- Yarn (1.22.x +)
- Node v18

## Project setup

- [Vite](https://vitejs.dev/)
- [i18n](https://react.i18next.com/)
- [Apollo](https://www.apollographql.com/docs/react/)
- [Tailwind](https://tailwindcss.com/)

### Install and development

- `yarn install` - install dependencies
- copy `.env` -> `.env.local` (override variables to suite your needs)
- to connect to dev environment BE, use `VITE_API_URL_<<MODE>>=https://caropticom-dev.azurewebsites.net/graphql-<<mode>>` (both public and private)
- `yarn start` - start development mode
- `yarn build` - build app to production mode
- `yarn preview` - local preview of the production build

Project is using Prettier and ESLint for code formatting and embracing quality code standards.

## Project structure

- **api** - contains API configs and utils
- **components**: generic components divided to 2 types: elements, shared
- **constants** - generic constants and route paths
- **config** - config files and lib settings
- **hooks** - generic hooks
- **types** - generic types
- **i18n** - localization
- **utils** - generic utils
- **router** - router definitions and utils
- **modules** -> main entrypoint for most changes and features split by
  module category. Folder structure is similar to the generic one but contains
  only specific files and utilities for the given module.
