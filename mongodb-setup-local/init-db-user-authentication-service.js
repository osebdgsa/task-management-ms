// Connect to the 'user-authentication-service' database
db = db.getSiblingDB('user-authentication-service');

// Create collections and insert initial data if needed
db.createCollection('users');

db.createUser({
    user: 'admin',
    pwd: 'admin',
    roles: [{ role: 'dbOwner', db: 'user-authentication-service' }]
});