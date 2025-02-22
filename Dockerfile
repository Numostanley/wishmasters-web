# Use an official Node.js image for building the app
FROM node:18 as build

# Set working directory
WORKDIR /app

RUN chmod +x entrypoint.sh

# Install Yarn
RUN npm install -g yarn

# Copy package files first (for caching)
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the app files
COPY . .

# Build the Vue.js application
RUN yarn build

# Expose the build directory as a volume
VOLUME /app/dist
