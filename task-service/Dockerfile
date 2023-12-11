# Use a Node.js base image
FROM node:latest

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the entire project directory to the working directory
COPY . .

# Build TypeScript files
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to start the app
CMD ["npm", "start"]
