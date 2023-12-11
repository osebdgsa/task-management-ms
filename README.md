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
#### Microservices
- Start MongoDB (either local or via Docker).

**Task Service:**
1. Navigate to the `task-service` directory.
2. Start the service: `npm start`.

**User Authentication Service:**
1. Navigate to the `user-authentication-service` directory.
2. Start the service: `npm start`.

#### React App
1. Navigate to the React app directory.
2. Install dependencies: `npm install`.
3. Start the development server: `npm start`.

## Decisions Made
- MongoDB: Chosen for its flexibility and speed due to the project having only one entity at heart.
- React & TypeScript: Employed to build an interactive user interface with strong typing.

## Future Enhancements
- Change the JWT secret.
