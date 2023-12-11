FROM mongo:latest

# Copy the initialization script into the container
COPY init-db.js /docker-entrypoint-initdb.d/

# Set permissions for the script (if needed)
RUN chmod +x /docker-entrypoint-initdb.d/init-db.js