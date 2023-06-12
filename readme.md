**Park Booking API**

**Project Setup**

Make sure you have Docker and Docker Compose installed on your machine.

Create an .env file in the project root directory with the following environment variables:

- PORT=
- DB_USERNAME=
- DB_PASSWORD=
- DB_PORT=
- DB_HOST=
- DB_NAME=

Note: If your local machine already use the port 5432 as a default postgres port, you might need to update it with a value other than 5432.

Replace the values with your desired configuration.

Install project dependencies by running the following command:

```npm install```

**Running the Project**

To run the project using Docker Compose, execute the following command in the terminal:

```docker-compose up --build -d```

This command will build the Docker images for the services defined in the docker-compose.yml file and start the containers in detached mode.

- The --build flag ensures that the images are rebuilt before starting the containers.
- The -d flag runs the containers in detached mode, which allows them to run in the background.
Once the containers are running, you can access the API at the specified port, which is defined in the environment variable PORT in the .env file.

Remember to update the .env file with the appropriate values for your environment, such as the database credentials and port number.

To stop the containers and remove the network, execute the following command:

```docker-compose down```

This command will gracefully stop the running containers and remove the network created by Docker Compose.

**SQL Scripts for inserting users which have standard and admin roles**

```sql
INSERT INTO user (first_name, last_name, email, role, token)
VALUES (adminUserName, adminLastName, adminEmail, 'admin', adminUserToken);

INSERT INTO user (first_name, last_name, email, role, token)
VALUES (standardUserName, standardUserLastName, standardUserEmail, 'standard', standardUserToken);
```

**Authentication Method**

API Key Authentication with api-key in the request header, API authenticates the request by checking if api-key value is one of user token in users table in the database.

**Authorization Rules**

- The standard user can create new bookings, and can get/edit/delete only the bookings created by himself.
- The admin user can create bookings, and also can get/edit/delete every existing booking.
- Both admin and standard user read parking spot list but only admin users can create/edit/delete the parking spots.

**API Endpoints**

- GET /api/v1/bookings - Get all bookings.

- POST /api/v1//bookings - Create a new booking.

- GET /api/bookings/:id - Get a specific booking by ID.

- PUT /api/bookings/:id - Update a specific booking by ID.

- DELETE /api/bookings/:id - Delete a specific booking by ID.

- POST /api/parking-spots - Create a new parking spot.

- GET /api/parking-spots - Get all parking spots.

- PUT /api/parking-spots/:id - Update a specific parking spot by ID.

- DELETE /api/parking-spots/:id - Delete a specific parking spot by ID.
