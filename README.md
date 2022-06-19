# karirlab

# How to Run the Project
- Install dependencies
    ```
    npm i
    ```
- Create database in postgres
    ```
    sequelize db:create
    ```
- Create tables
    ```
    sequelize db:migrate
    ```
- Start the server
    ```
    npm run dev
    ``` 
- Open your postman application
- Import `JSON` from `postmanData/karirlab.postman_collection`
- Try to hit one of the five available endpoints

<br>

# Endpoints
- POST /create-new-resume
- GET /get-all-resumes
- GET /find-one-resume/:resume_id
- PUT /edit-one-resume/:resume_id
- DELETE /delete-one-resume/:resume_id