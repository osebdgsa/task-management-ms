# Use the official MongoDB image as the base image
FROM mongo:latest

# Copy the initialization scripts into the container
COPY init-db-task-service.js /docker-entrypoint-initdb.d/
COPY init-db-user-authentication-service.js /docker-entrypoint-initdb.d/