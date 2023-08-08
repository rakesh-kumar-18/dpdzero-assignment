# Express API with SQL Database

This project is a simple backend system built using the Express.js framework and an SQL database. It provides various APIs for user registration, token generation, storing and retrieving data, updating data, and deleting data.

## Framework Choice

We chose to use the Express.js framework due to its simplicity, scalability, and flexibility for building RESTful APIs. Express allows us to quickly set up routes, handle middleware, and interact with databases efficiently.

## Database Schema

The database schema includes two main tables: `Users` and `Data`. The `Users` table stores user information such as username, email, password hash, full name, age, and gender. The `Data` table stores key-value pairs for storing and retrieving data.

## Docker Setup

This project also includes Docker setup for easier development and deployment. Docker allows you to containerize your application along with its dependencies.

### Prerequisites

- Install Docker: [Docker Desktop](https://www.docker.com/products/docker-desktop)

## Instructions to Run the Code

1. Clone the repository:
   ```bash
   git clone https://github.com/rakesh-kumar-18/dpdzero-assignment.git
   cd dpdzero-assignment
   ```
   
2. Install dependencies:
   `npm install`
   
3. Create a `.env` file in the root directory and provide your database credentials:
   ```plaintext
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_DATABASE=your_database_name
   JWT_SECRET=your_secret_key
   ```
   
4. Run the server:
   `npm start`
   
### OR

5. Build and start the containers:
   `docker-compose up --build`

6. When done, stop the containers by pressing `Ctrl+C` in the terminal where `docker-compose up` is running.

   


## Instructions to Setup the Code

1. Install Node.js and npm if not already installed.

2. Install MySQL and create a database. Update the .env file with your database credentials.

3. Create the necessary tables manually or by running the following command:
```npx sequelize-cli db:migrate```

4. Follow the "Instructions to Run the Code" section above.

## Docker Configuration

The Docker setup includes two services: express-app and mysql. The Express app runs on port 3000, and the MySQL container exposes port 3306.
   
## Endpoints

- User Registration: `POST /api/register`
  
- Generate Token: `POST /api/token`
  
- Store Data: `POST /api/data`
  
- Retrieve Data: `GET /api/data/:key`
  
- Update Data: `PUT /api/data/:key`
  
- Delete Data: `DELETE /api/data/:key`

Feel free to contribute by submitting pull requests!

Remember to replace placeholders like `your-username`, `your_database_host`, `your_database_user`, `your_database_password`, `your_database_name`, `your_secret_key`, and customize the content to match your project's specifics.
