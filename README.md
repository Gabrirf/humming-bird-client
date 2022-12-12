# humming-bird-client
Starter API Rest in NodeJS to consume Humming Bird API Rest by PodGroup

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
