# Stage 1: Build the frontend
FROM node:18 AS build

WORKDIR /app

# Copy package files first for better caching
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the application
RUN yarn build

# Stage 2: Serve built files using Nginx
FROM nginx:latest

# Set working directory in Nginx container
WORKDIR /usr/share/nginx/html

# Remove default Nginx static files
RUN rm -rf ./*

# Copy built frontend from previous stage
COPY --from=build /app/dist .

# Copy custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
