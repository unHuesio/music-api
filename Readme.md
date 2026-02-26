### Express server that exposes an api for products

#### Projet structure

- Application: Contains main service to handle crud operations
- Domain: Contains Product class and a Repository interface to handle different database options
- Infrastructure: Contains database client configuration with supabase, a repository that handles postgres connectivity and a dummy in memory repository. It also contains a schema to create the product table on first hand, and initial server files.
- Interfaces: Contains controllers that handle crud operations via the routes, middlewares and schemas for validations
- Tests: Contains unit and integration tests

Project was deploy in google cloud run service and is available through:

https://music-api-29813145857.europe-west1.run.app

#### API Documentation

https://music-api-29813145857.europe-west1.run.app/api-docs

