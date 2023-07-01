To start the application, run the command "docker-compose up" to create and
launch the Docker container with the server, database, and Postgres admin panel.

The server will be running on port 3000.

The database admin panel will be accessible on port 5050.

The database will be listening on port 5432.

To register the database server in the admin panel, follow these steps:

- in the registration window, go to the General tab and enter "task_manager" in
  the Name field.
- In the Connection tab, enter "task_manager_postgres_db" in the Host
  name/address field, "5432" in the Port field, and "task_manager" in the
  Username field.

To test admin privileges, after registering the user, update the Role field in
the database to "admin" for the relevant user.
