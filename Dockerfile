# Use an official Node.js image for building the app
FROM node:18 as build

# Set working directory
WORKDIR /app

# Copy package files first (for caching)
COPY package.json yarn.lock ./

# Install dependencies using Yarn (already available in the image)
RUN yarn install

# Copy the rest of the app files
COPY . .

RUN chmod +x start-nginx.sh

# Build the Vue.js application
RUN yarn yarn dev

EXPOSE 5173
