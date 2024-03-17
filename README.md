# Goal Setter App

The Goal Setter App is a simple MERN (MongoDB, Express.js, React.js, Node.js) stack application that allows users to authenticate, set their own goals, list their goals, and delete them. It utilizes Redux Toolkit for state management.

## Features

- **User Authentication**: Users can sign up, log in, and log out of the application to securely access their personal goals.
- **Goal Creation**: Authenticated users can create new goals by specifying a title.
- **Goal Listing**: Users can view a list of their created goals, including title and the date that the goal is setted.
- **Goal Deletion**: Users have the ability to delete their own goals if they no longer wish to track them.

## Prerequisites

Before running the application, ensure that you have the following installed:

- Node.js 

## Installation

1. Clone the repository:

   ```
   git clone https://github.com/your-username/goal-setter-app.git
   ```

2. Navigate to the project directory:
  ```
  cd goal-setter-app
  ```
3. Install the dependencies:
  ```
  npm install
  ```
4. Set up environment variables:
Create a .env file in the root folder and configure the following variables:
  ```
  PORT=5000
  MONGO_URI=your_mongodb_connection_string
  JWT_SECRET=your_jwt_secret_key
  ```
5. start the application
  ```
  npm run dev
  ```
6. Access the application:
Open your browser and navigate to http://localhost:5173 to access the Goal Setter App.

## Technologies Used

- MongoDB: NoSQL database for storing user data and goals.
- Express.js: Web application framework for building the RESTful API.
- React.js: JavaScript library for building the user interface.
- Node.js: JavaScript runtime environment for running the server-side code.
- Redux Toolkit: State management library for managing application state.
- JWT (JSON Web Tokens): Used for user authentication and authorization.
