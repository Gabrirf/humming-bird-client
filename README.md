# humming-bird-client
Starter API Rest in NodeJS to consume Humming Bird API Rest by PodGroup

# Structure

```
📦humming-bird-client
 ┣ 📂.vscode
 ┃ ┣ 📜launch.json
 ┃ ┗ 📜settings.json
 ┣ 📂docker
 ┃ ┣ 📜docker-compose.app.yml
 ┃ ┗ 📜docker-compose.test.yml
 ┣ 📂src
 ┃ ┣ 📂config
 ┃ ┃ ┣ 📜morgan.js
 ┃ ┃ ┣ 📜openapi.js
 ┃ ┃ ┗ 📜winston.js
 ┃ ┣ 📂controllers
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┗ 📜ping.js
 ┃ ┣ 📂helpers
 ┃ ┃ ┣ 📂errors
 ┃ ┃ ┃ ┗ 📜error-codes.js
 ┃ ┃ ┣ 📂logger
 ┃ ┃ ┃ ┗ 📜winston.js
 ┃ ┃ ┣ 📂utils
 ┃ ┃ ┃ ┣ 📜base64.js
 ┃ ┃ ┃ ┗ 📜stack-info.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂loaders
 ┃ ┃ ┣ 📜express.js
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📂middlewares
 ┃ ┃ ┣ 📜error-handler.js
 ┃ ┃ ┗ 📜security-handler.js
 ┃ ┣ 📂openapi
 ┃ ┃ ┣ 📂examples
 ┃ ┃ ┃ ┗ 📜Ping.yml
 ┃ ┃ ┣ 📂responses
 ┃ ┃ ┃ ┗ 📜Errors.yml
 ┃ ┃ ┣ 📂schemas
 ┃ ┃ ┃ ┗ 📜Error.yml
 ┃ ┃ ┣ 📂security
 ┃ ┃ ┃ ┣ 📜IpAuth.yml
 ┃ ┃ ┃ ┣ 📜basicOAuth.yml
 ┃ ┃ ┃ ┗ 📜disabled.yml
 ┃ ┃ ┗ 📜api-doc.js
 ┃ ┣ 📂routes
 ┃ ┃ ┗ 📂v1
 ┃ ┃ ┃ ┣ 📜ping.js
 ┃ ┃ ┃ ┗ 📜ping.yml
 ┃ ┣ 📂services
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜app.js
 ┃ ┣ 📜config.js
 ┃ ┗ 📜index.js
 ┣ 📂test
 ┃ ┣ 📂unit
 ┃ ┃ ┣ 📂controllers
 ┃ ┃ ┃ ┗ 📜ping.test.js
 ┃ ┃ ┣ 📂loaders
 ┃ ┃ ┃ ┗ 📜express.test.js
 ┃ ┃ ┣ 📂middlewares
 ┃ ┃ ┃ ┣ 📜error-handler.test.js
 ┃ ┃ ┃ ┗ 📜security-handler.test.js
 ┃ ┃ ┗ 📂services
 ┃ ┣ 📂utils
 ┃ ┃ ┗ 📜controllers.js
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
- `js-yaml`
- `swagger-ui-express`
- `morgan`
- `winston`

# Linter

By using npm script, you can see and fix all linter errors and warning

- `npm run lint`
- `npm run lint:fix`

# Test

There are npm script created to easily run test:

- `npm run test`
- `npm run test:watch`
- `npm run test:report` Must be sonarqube running
    - To run sonarqube server: `npm run compose:test`
    - First time deploy, change password to _adminadmin_
    - After the report go to [localhost:9000](http://localhost:9000/) and see analysis
