Park Booking API

Project Setup
Make sure you have Docker and Docker Compose installed on your machine.

Create an .env file in the project root directory with the following environment variables:

PORT=
DB_USERNAME=
DB_PASSWORD=
DB_PORT=
DB_HOST=
DB_NAME=

Note: If your local machine already use the port 5432 as a default postgres port, you might need to update it with a value other than 5432.

Replace the values with your desired configuration.

Install project dependencies by running the following command:

npm install

Running the Project

To run the project using Docker Compose, execute the following command in the terminal:

docker-compose up --build -d

This command will build the Docker images for the services defined in the docker-compose.yml file and start the containers in detached mode.

The --build flag ensures that the images are rebuilt before starting the containers.
The -d flag runs the containers in detached mode, which allows them to run in the background.
Once the containers are running, you can access the API at the specified port, which is defined in the environment variable PORT in the .env file.

Remember to update the .env file with the appropriate values for your environment, such as the database credentials and port number.

To stop the containers and remove the network, execute the following command:

docker-compose down

This command will gracefully stop the running containers and remove the network created by Docker Compose.

SQL Insert Scripts for inserting users which have standard and admin roles

INSERT INTO user (first_name, last_name, email, role, token)
VALUES (adminUserName, adminLastName, adminEmail, 'admin', adminUserToken);

INSERT INTO user (first_name, last_name, email, role, token)
VALUES (standardUserName, standardUserLastName, standardUserEmail, 'admin', standardUserToken);

Authentication Method
API Key Authentication with api-key in the request header, API authenticates the request by checking if api-key value is one of user token in users table in the database 

API Endpoints
GET /api/bookings: Get all bookings.

POST /api/bookings: Create a new booking.

GET /api/bookings/:id: Get a specific booking by ID.

PUT /api/bookings/:id: Update a specific booking by ID.

DELETE /api/bookings/:id: Delete a specific booking by ID.

GET /api/parking-spots: Get all parking spots.

POST /api/parking-spots: Create a new parking spot.

GET /api/parking-spots/:id: Get a specific parking spot by ID.

PUT /api/parking-spots/:id: Update a specific parking spot by ID.

DELETE /api/parking-spots/:id: Delete a specific parking spot by ID.