# Staff Scheduling application

#### Write a backend application for the staff scheduling system. Users must be able to create an account and log in.

Implement 2 roles with different permission levels
- Staff User:
  - Can view his/her schedule for any period of time (up to 1 year)
  - Can see his/her coworker schedules
- Admin:
  - Can edit/delete all users,
  - Can create/edit/delete schedule for users
  - Can order users list by accumulated work hours per arbitrary period (up to 1
    year).

### Schedule should have:
- Work date
- User
- Shift length in hours

## Deliverables:
- Create relevant REST endpoints that can be accessed and interacted via Postman or
  other similar software.
- Add Relevant unit tests.
- Create a documentation page using Open API specifications.
- Dockerize application and add README file describing how to run the project.
- Upload your project to Github

## Technologies to use:
- Node.js (Express.js or other framework is also fine)
- Mysql
- Docker

## Test
For run the test you can use:

`npm run test`

## Run application
There is a postman collection in `Scheduler.postman_collection.json`

To be able to run the application you should have [docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose) installed

`docker-compose run`

Add `-d` if you want to run it in background

It would start the database (MariaDB) and the server

## Environment
There is a environment file to parameterize the system, by default:

```
MYSQL_ROOT_PASSWORD=S3cret
DB_HOST=database
DB_USERNAME=mysql
DB_PASSWORD=mysqlpassword
DB_PORT=3306
DB_DATABASE=scheduler
APP_PORT=3000
```


## Personal Decisions
I took some assumptions regarding:
- Period of time: mandatory to put queries "from" and "to" up to 1 year of different
- Not able to create a new schedule if another schedule match between start date and finishing the schedule

## Anotations
I had to use MariaDB because with MySQL I had some trouble using Apple Silicon M1.

## Future Improvement
- Improve testing:
  - Test Controllers
  - Test E2E
- Pagination
- Data consistency using transactions in database
- Improve error handlers
