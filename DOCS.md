Technology Used in Project(Nodejs Backend):

1. `@prisma/client`: Prisma is an Object-Relational Mapping (ORM) tool for Node.js that simplifies database access and manipulation.

2. `bcrypt`: Bcrypt is a library used for hashing and salting passwords. It provides functions to securely hash passwords and compare hashed passwords with user input, making it a common choice for password encryption in Node.js applications.

3. `chai`: Chai is an assertion library that provides various assertion styles and interfaces for writing tests in Node.js. It offers expressive syntax and supports different testing frameworks, making it easier to write readable and comprehensive test cases.

4. `cors`: CORS (Cross-Origin Resource Sharing) is a mechanism that allows web browsers to make requests to a different domain. The `cors` package provides middleware for Express applications to handle CORS-related headers and settings, enabling cross-origin requests.

5. `dotenv`: Dotenv allows you to load environment variables from a `.env` file into your Node.js application. It simplifies the process of managing configuration variables, such as database credentials or API keys, by keeping them separate from your codebase and allowing you to easily switch between different environments.

6. `express`: Express is a popular web application framework for Node.js. It provides a set of features and utilities to build robust and scalable web servers. Express simplifies routing, middleware handling, and request/response management, making it a go-to choice for building APIs and web applications.

7. `http-terminator`: The `http-terminator` package provides a way to gracefully terminate HTTP and HTTPS servers in Node.js. It ensures that all pending requests are completed before shutting down the server, preventing any abrupt termination.

8. `joi`: Joi is a powerful schema validation library for JavaScript. It allows you to define validation rules and constraints for data structures, such as objects and arrays, and validate input against those rules. Joi is often used for request payload validation in Node.js applications.

9. `jsonwebtoken`: Jsonwebtoken is a library used for generating and verifying JSON Web Tokens (JWT). JWTs are used for authentication and authorization in web applications. This package provides functions to sign and verify JWTs, as well as utilities for working with token expiration, claims, and other JWT-related features.

10. `log4js`: Log4js is a flexible logging library for Node.js. It provides different logging appenders, layouts, and configurations to log messages to various outputs (e.g., console, file, database). Log4js allows you to define logging levels, customize log formats, and control log output.

11. `migrate`: The `migrate` package is a database migration tool for Node.js. It helps manage and execute database schema changes, such as creating tables or modifying existing ones, in a controlled and versioned manner. Migrations allow you to evolve your database schema over time while preserving data integrity.

12. `mocha`: Mocha is a feature-rich JavaScript testing framework that runs on Node.js. It provides a clean and flexible syntax for writing test cases, supports various testing styles

13. `chai-http` Chai-HTTP allows you to send HTTP requests such as GET, POST, PUT, DELETE, etc. to your server for testing HTTP endpoints.

Steps to run code locally

Step 1: Clone the project from my forked repo which is https://github.com/sandesh578/backend-assignment.git

Step 2: Open in VSCode

Step 3: Run command npm install

Step 4: Change the environment variable for username and password of MySQL database
DATABASE_URL="mysql://root:Root@localhost:3306/salesmanagement"

Step 5: Create salesmanagement schema in MYSQL database

Step 6: Run npx prisma generate command and also node seed command for seeding data to database

Step 7: Run command npm run start to run project and check for api

Step 8: Open browser and enter http://localhost:5021/api-docs/# to look at the Swagger API documentation after running server

Step 9: Run command npm run test to test unit testing implemented for authController
