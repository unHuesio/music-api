# Use the official lightweight Node.js image.
# https://hub.docker.com/_/node
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Install pnpm globally
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml for dependency installation
COPY package.json .
COPY pnpm-lock.yaml .

# Install production dependencies.
# If you have devDependencies needed for build, remove --prod or separate build stage
RUN pnpm install

# Copy application source code
COPY . .

# Build the TypeScript application
RUN pnpm run build

# Ensure uploads directory exists at runtime
RUN mkdir -p public/uploads

# Start the application
CMD [ "pnpm", "start" ]
