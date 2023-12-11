# Use a Node.js base image
FROM node:latest

# Set working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application code to the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start the app
CMD ["node", "server.ts"]