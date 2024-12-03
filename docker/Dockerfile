# Step 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Install global dependencies (if any)
RUN yarn global add typescript

# Copy package.json and yarn.lock to install dependencies
COPY ../package.json ../yarn.lock ./

# Install dependencies (production and development)
RUN yarn install

# Copy all application files to the working directory
COPY ../ .

# Build the TypeScript application
RUN yarn build

# Step 2: Production Stage
FROM node:18-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and yarn.lock from the build stage
COPY --from=build /app/package.json /app/yarn.lock ./

# Install only production dependencies
RUN yarn install --production

# Copy the compiled dist folder and other necessary files from the build stage
COPY --from=build /app/dist /app/dist

# Copy environment variables file (optional, if you want to pass .env)
COPY ../.env .env

# Expose the port the app will run on
EXPOSE 5000

# Start the application
CMD ["yarn", "start"]
