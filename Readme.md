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

#### Technical Choices

- Express: lightweight and not bloated, minimal framework to build apis
- Helm: middleware to add security headers
- cors: middleware to configure cors
- multer: middleware to handle file uploads
- sharp: middleware to handle image processing
- swagger: for documentation
- zod: for validations
- supabase: to create supabase client and handle img uploads to bucket
- vitest: to write unit tests
- supertests: to write integration tests

#### Commands

```pnpm run test``` run tests

```pnpm run build``` run build

```pnpm run dev``` run dev mode

```pnpm run start``` starts server after build

#### ENV Configuration

SUPABASE_URL= URL to connect so supabase

SUPABASE_ANON_KEY= Anon key for public client usage

SUPABASE_SERVICE_ROLE_KEY= Required for backend DB operations and storage uploads

SUPABASE_STORAGE_BUCKET= storage bucket name for image uploads

CORS_ORIGINS= Allowed domains

#### Deployment

Google Cloud Run: Scalable container

Storage: Supabase storage for images - free tier

Database: Supabase postgres free database



