# Deprecated

# Express, PostgreSQL & Sequelize REST API Boilerplate in ES6 with Code Coverage. [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)

# [![Express ES6 REST API Starter](https://cloud.githubusercontent.com/assets/4172932/12660610/90f5b856-c63a-11e5-878e-c9f0bbf33090.jpg)](https://github.com/gauravprwl14)

## Overview

This is a boilerplate application for building REST APIs in Node.js using ES6, Express PostgreSQL and Sequelize ORM along with Code Coverage and JWT Authentication. Helps you stay productive by following best practices. Follows [Airbnb's Javascript style guide](https://github.com/airbnb/javascript).

Heavily inspired from [Express-Mongoose-Es6-Rest-Api](https://github.com/kunalkapadia/express-mongoose-es6-rest-api) and [Egghead.io - How to Write an Open Source JavaScript Library](https://egghead.io/courses/how-to-write-an-open-source-javascript-library).

### Features

| Feature                                                                                             | Summary                                                                                                                                                                                                                                                                                                                                                                     |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ES6 via Babel                                                                                       | ES6 support using [Babel](https://babeljs.io/).                                                                                                                                                                                                                                                                                                                             |
| Authentication via JsonWebToken                                                                     | Supports authentication using [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken).                                                                                                                                                                                                                                                                                   |
| Code Linting                                                                                        | JavaScript code linting is done using [ESLint](http://eslint.org) - a pluggable linter tool for identifying and reporting on patterns in JavaScript. Uses ESLint with [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb), which tries to follow the Airbnb JavaScript style guide.                                      |
| Auto server restart                                                                                 | Restart the server using [nodemon](https://github.com/remy/nodemon) in real-time anytime an edit is made, with babel compilation and eslint.                                                                                                                                                                                                                                |
| ES6 Code Coverage via [istanbul](https://www.npmjs.com/package/istanbul)                            | Supports code coverage of ES6 code using istanbul and mocha. Code coverage reports are saved in `coverage/` directory post `yarn test` execution. Open `coverage/lcov-report/index.html` to view coverage report. `yarn test` also displays code coverage summary on console. Code coverage can also be enforced overall and per file as well, configured via .istanbul.yml |
| Debugging via [debug](https://www.npmjs.com/package/debug)                                          | Instead of inserting and deleting console.log you can replace it with the debug function and just leave it there. You can then selectively debug portions of your code by setting DEBUG env variable. If DEBUG env variable is not set, nothing is displayed to the console.                                                                                                |
| Promisified Code via [bluebird](https://github.com/petkaantonov/bluebird)                           | We love promise, don't we ? All our code is promisified and even so our tests via [supertest](https://www.npmjs.com/package/supertest).                                                                                                                                                                                                                                     |
| API parameter validation via [express-validation](https://www.npmjs.com/package/express-validation) | Validate body, params, query, headers and cookies of a request (via middleware) and return a response with errors; if any of the configured validation rules fail. You won't anymore need to make your route handler dirty with such validations.                                                                                                                           |
| Pre-commit hooks                                                                                    | Runs lint and tests before any commit is made locally, making sure that only tested and quality code is committed                                                                                                                                                                                                                                                           |
| Secure app via [helmet](https://github.com/helmetjs/helmet)                                         | Helmet helps secure Express apps by setting various HTTP headers.                                                                                                                                                                                                                                                                                                           |
| Uses [yarn](https://yarnpkg.com) over npm                                                           | Uses new released yarn package manager by facebook. You can read more about it [here](https://code.facebook.com/posts/1840075619545360)                                                                                                                                                                                                                                     |

*   CORS support via [cors](https://github.com/expressjs/cors)
*   Uses [http-status](https://www.npmjs.com/package/http-status) to set http status code. It is recommended to use `httpStatus.INTERNAL_SERVER_ERROR` instead of directly using `500` when setting status code.
*   Has `.editorconfig` which helps developers define and maintain consistent coding styles between different editors and IDEs.

## Getting Started

Install yarn:

```js
npm install -g yarn
```

Install dependencies:

```sh
yarn
```

Set environment (vars):

```sh
cp .env.example .env
```

Start server:

```sh
# Start server
yarn start

# Selectively set DEBUG env var to get logs
DEBUG=express-postgresql-sequelize-es6-rest-api:* yarn start
```

Tests:

```sh
# Run tests written in ES6 and see the code coverage
yarn test

# Run tests on file change
yarn test:watch
```

Lint:

```sh
# Lint code with ESLint
yarn lint

# Run lint on any file change
yarn lint:watch
```

Other gulp tasks:

```sh
# Wipe out dist and coverage directory
gulp clean

# Default task: Wipes out dist and coverage directory. Compiles using babel.
gulp
```

##### Deployment

```sh
# compile to ES5
1. yarn build

# upload dist/ to your server
2. scp -rp dist/ user@dest:/path

# install production dependencies only
3. yarn --production

# Use any process manager to start your services
4. pm2 start dist/index.js
```

In production you need to make sure your server is always up so you should ideally use any of the process manager recommended [here](http://expressjs.com/en/advanced/pm.html).
We recommend [pm2](http://pm2.keymetrics.io/) as it has several useful features like it can be configured to auto-start your services if system is rebooted.

## Logging

Universal logging library [winston](https://www.npmjs.com/package/winston) is used for logging. It has support for multiple transports. A transport is essentially a storage device for your logs. Each instance of a winston logger can have multiple transports configured at different levels. For example, one may want error logs to be stored in a persistent remote location (like a database), but all logs output to the console or a local file. We just log to the console for simplicity, you can configure more transports as per your requirement.

#### API logging

Logs detailed info about each api request to console during development.
![Detailed API logging](https://cloud.githubusercontent.com/assets/4172932/12563354/f0a4b558-c3cf-11e5-9d8c-66f7ca323eac.JPG)

#### Error logging

Logs stacktrace of error to console along with other details. You should ideally store all error messages persistently.
![Error logging](https://cloud.githubusercontent.com/assets/4172932/12563361/fb9ef108-c3cf-11e5-9a58-3c5c4936ae3e.JPG)

## Code Coverage

Get code coverage summary on executing `yarn test`
![Code Coverage Text Summary](https://cloud.githubusercontent.com/assets/4172932/12827832/a0531e70-cba7-11e5-9b7c-9e7f833d8f9f.JPG)

`yarn test` also generates HTML code coverage report in `coverage/` directory. Open `lcov-report/index.html` to view it.
![Code coverage HTML report](https://cloud.githubusercontent.com/assets/4172932/12625331/571a48fe-c559-11e5-8aa0-f9aacfb8c1cb.jpg)
