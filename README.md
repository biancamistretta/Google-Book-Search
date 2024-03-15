# Google-Book-Search / GraphQL API Refactoring Project

This project involves refactoring an existing RESTful API to utilize GraphQL for both the backend and frontend. The application is currently built using Express.js for the server-side logic and React.js for the frontend. The goal is to replace the RESTful endpoints with a GraphQL API and update the frontend components to interact with the new API.

## Getting Started
To begin working on this project, follow the steps below:

Clone the repository to your local machine:

bash
Copy code
git clone <repository-url>
Navigate to the project directory:

bash
Copy code
cd <project-directory>
Install dependencies for both the server and client:

bash
Copy code
cd server && npm install
cd ../client && npm install
Set up the database connection (if applicable) in server/config/connection.js.

Run the server:

bash
Copy code
cd ../server && npm start
Run the client:

bash
Copy code
cd ../client && npm start
Open your browser and navigate to http://localhost:3000 to view the application.

## Technologies Used

Backend:

Node.js
Express.js
MongoDB (if applicable)
Mongoose (if using MongoDB)
GraphQL
Apollo Server
Frontend:

React.js
Apollo Client
HTML
CSS

## Backend Specifications
Update the authentication middleware (authMiddleware) in server/schemas/resolvers.js to work with GraphQL.
Implement Apollo Server in server.js and apply it as middleware to the Express server.
Define GraphQL type definitions (typeDefs.js) and resolver functions (resolvers.js) in the server/schemas/ directory.
Implement the following mutations in the resolvers:
login
addUser
saveBook
removeBook

## Frontend Specifications
Define GraphQL queries in client/src/graphql/queries.js.
Define GraphQL mutations in client/src/graphql/mutations.js.
Update frontend components to use Apollo Client for executing GraphQL queries and mutations.

## Credits
Columbia Bootcamp
