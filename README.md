# Home assignment

## Technologies Used
- Node.js
- Express
- MongoDB
- React
- TypeScript
- Axios
- Mongoose

## Setup Instructions

### Prerequisites
- Node.js installed
- MongoDB installed (or Docker setup)
- Docker 

### Installation
1. Clone the repository.
2. Navigate to `task-service` and `user-authentication-service` directories.
3. Install dependencies: `npm install`.

### Running the Application

#### Using docker (simple)
1. docker-compose up
2. cd task-manager-ui
3. npm run start
4. register
5. login
6. create tasks
7. list tasks 
8. edit | delete tasks
9. when you are done logout

#### Without docker (clumsy)

**MongoDB:**
1. Make sure you have the mongo server running.
2. Make sure you have `task-service` and `user-authentication-service` databases created.
3. Make sure the mongoose connection url points to your local mongoDB address as they are currently
   configured for a docker network alias.
4. (Optional) Use a superuser with root access on both of those databases when connecting to db.

**Task Service:**

1. Navigate to the `task-service` directory.
2. Build the service: `npm run build`. 
3. Start the service: `npm run start`.

**User Authentication Service:**
1. Navigate to the `user-authentication-service` directory.
2. Build the service: `npm run build`.
3. Start the service: `npm run start`.

#### React App
1. Navigate to the React app directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## Decisions Made
- MongoDB: Chosen for its flexibility and speed due to the project having only one entity at heart.
- React & TypeScript: Employed to build an interactive user interface with strong typing.

## Future Enhancements
- Change the JWT secret.
- Implement JWT token refresh
- Prettier components
- DI Containers
- Modules (NestJS ?)
