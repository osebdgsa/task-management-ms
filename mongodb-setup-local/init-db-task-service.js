// Connect to the 'task-service' database
db = db.getSiblingDB('task-service');

// Create collections and insert initial data if needed
db.createCollection('tasks');

db.createUser({
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'dbOwner', db: 'task-service' }]
});