# MENTORSITY ASSINGMENT

Task-Create a session id for the user who has logged in to website . Please create a session and cookies in node js with login signup api's.

## Getting Started

To get started with this application, follow the instructions below.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)

### Installation

1.npm install

2.Plz add the .ENV file or i have commented the MONGO_URI in the server.js use that .
3. nodemon server.js / node server.js

###API Endpoints
1. Sign Up
URL: /signup
Method: POST
Request Body:
{
  "username": "your_username",
  "password": "your_password"
}

2. Login
URL: /login
Method: POST
Request Body:

{
  "username": "your_username",
  "password": "your_password"
}
Response:
200 OK: Login successful.
401 Unauthorized: Invalid username or password.
500 Internal Server Error: An error occurred on the server.
3. Logout
URL: /logout
Method: POST
Response:
200 OK: Logout successful.
500 Internal Server Error: An error occurred on the server.

