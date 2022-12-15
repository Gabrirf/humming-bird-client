# humming-bird-client

Starter API Rest in NodeJS to consume Humming Bird API Rest by PodGroup

## Instalation

1. Download or clone this repo

```bash
git clone https://github.com/Gabrirf/humming-bird-client.git
```

2. Install npm dependencies

```bash
npm i
```

3. Copy & configure env file

```bash
npm run copy:env
```

> You must insert your Humming Bird API username and password on variable.

4. Build docker image and deploy app

```bash
npm run compose:app
```

Or simply run on your local with `npm start` for develop.

5. By default, the app deploy on port 3000 and all requests are versioned under `/v1` path. To use the app you can:
    - **SwaggerUI** go to [localhost:3000/docs](http://localhost:3000/docs) to see swagger playground
    - **Postman** Use the provided [postman collectión](./hb-client.postman_collection.json).

## Architecture

```bash
📦humming-bird-client
 ┣ 📂.vscode
 ┃ ┗ 📜launch.json # Debugging configuration file
 ┣ 📂docker
 ┃ ┣ 📜docker-compose.app.yml # Build and deploy app
 ┃ ┗ 📜docker-compose.test.yml # Deploy Sonarqube
 ┣ 📂src
 ┃ ┣ 📂config # Modules configurations
 ┃ ┣ 📂controllers # API controllers
 ┃ ┣ 📂helpers # Common modules to make code easier
 ┃ ┃ ┣ 📂errors
 ┃ ┃ ┣ 📂logger
 ┃ ┃ ┣ 📂utils
 ┃ ┣ 📂loaders # Setup server and services on load
 ┃ ┣ 📂middlewares # API middlewares
 ┃ ┣ 📂openapi # Openapi (Swagger v3) specification
 ┃ ┃ ┣ 📂examples
 ┃ ┃ ┣ 📂responses
 ┃ ┃ ┣ 📂schemas
 ┃ ┃ ┣ 📂security
 ┃ ┣ 📂routes # API routes
 ┃ ┃ ┗ 📂v1
 ┃ ┣ 📂services # External services
 ┃ ┣ 📜app.js # App main
 ┃ ┣ 📜config.js # Centralize user variables
 ┃ ┗ 📜index.js # Launch app
 ┣ 📂test
 ┃ ┣ 📂unit
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📂loaders
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┗ 📂services
 ┃ ┣ 📂utils
 ┃ ┗ 📜sonar.js
 ┣ 📜.dockerignore
 ┣ 📜.editorconfig
 ┣ 📜.env
 ┣ 📜.eslintrc.js
 ┣ 📜.gitignore
 ┣ 📜Dockerfile
 ┣ 📜LICENSE
 ┣ 📜README.md
 ┣ 📜env.template
 ┣ 📜package-lock.json
 ┗ 📜package.json
```

## Main dependencies

- `express`
- `express-openapi`
- `swagger-ui-express`
- `morgan`
- `winston`
- `got`

## Linter

By using npm script, you can see and fix all linter errors and warning

- `npm run lint`
- `npm run lint:fix`

## Test

There are npm script created to easily run test:

- `npm run test`
- `npm run test:watch`
- `npm run test:report` Must be sonarqube running
    - To run sonarqube server: `npm run compose:test`
    - First time deploy: user _admin_, password: _admin_
        - change password to _adminadmin_
    - After the report go to [localhost:9000](http://localhost:9000/) and see analysis
