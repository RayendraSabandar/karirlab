# Karirlab Take Home Assignment

# Overview
### Dear engineers, I have finished my take home assignment
### For this project, my tech stack are:
- Javascript (Programming Language)
- PostgreSQL (Database)
- Sequelize (ORM)
- Express (Web Application Framework)
- Jest & Supertest (Testing Framework)
## Main Technical Decisions & Comments
```
I Created relational database in this project hence my use of postgreSQL.
- Resumes has many Educations
- Resumes has many Occupations

I first considered that Achievements belongs to Resumes and Occupations
but considering achievements are only an individual strings, I decided not to. 

I would say, for the long run, achievement should have it's own table and relation as I've mentioned above
because in the later time, achievement would probably has many other fields such as date, detail, location, ect.
With that being said, I would then make individual tables able to be accessed individually. 
If you want to edit a resume, you'd have to edit achievement, occupation, and education individually,
unlike the current karirlab website, so that each of them would be one microservice.

I created these endpoints to have the same body structure whether it's to create or edit.
That was to make it easy for front-end engineers to use this API,
although it made me (personally) harder to make a modularized functions. 
If you create a new resume, one endpoint and static function would create a new resume, education, and application
I would say it's better to create each of them in a different static function 
but that would mean either multiple endpoints to hit or one orchestrator endpoint that would hit each microservices endpoints

I try my best to make any variables or function that are going to be used more than once to be modularized
so that each file won't be filled with the same lines of codes.
Along with user-friendly variable names, file names, and folder structures, I hope I have made an organized and clean-coded repo

I would say my current project is not the best that it could have been, so your inputs would be highly appriciated.
 ```
# How to Run the Project
- Install dependencies
    ```
    npm i
    ```
- Open config/config.json
- Change `username` and `password` according to your `postgres` application
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
- Open your `postman` application
- Import `JSON` file from `postmanData/karirlab.postman_collection`
- Try to hit one of the five available endpoints

<br>

# Testing
- Create database and migrate 
    ```
    npm run create-test-db
    npm run migrate-test-db
    ```
- Run test
    ```
    npm run test
    ```

# Endpoints
- POST /create-new-resume
- GET /get-all-resumes
- GET /find-one-resume/:resume_id
- PUT /edit-one-resume/:resume_id
- DELETE /delete-one-resume/:resume_id

<br>

# Documentation
## POST /resumes/create-new-resume
> Create a new Resume

_Request Header_
```
Not needed
```
_Request Body_
```
body: {
    "name": "Peter Parker",
    "email": "peter.parker@gmail.com",
    "phone_number": "+6281230493830",
    "linkedin_url": "https://www.linkedin.com/in/peter-parker",
    "portfolio_url": "https://www.peterparker.com",
    "occupations": [
        {
            "company_name": "Avengers",
            "occupation_position": "Spider-Man",
            "occupation_start": "2018-04-26T00:00:00+07:00",
            "occupation_end": "2021-12-17T00:00:00+07:00",
            "occupation_status": "Full Time",
            "occupation_achievement": ["Avengers Termuda"]
        }
    ],
    "educations": [
        {
            "education_name": "Midtown High School",
            "education_degree": "SMA",
            "education_faculty": "Ilmu Pengetahuan Alam",
            "education_city": "Queens",
            "education_start": "2016-04-21T00:00:00+07:00",
            "education_end": "2021-12-17T00:00:00+07:00",
            "education_score": 3.95
        }
    ],
    "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
}
```
_Response (201)_ [Success]
```
{
    "message": "Successfully created a new resume",
    "resume": {
        "id": 1,
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter-parker",
        "portfolio_url": "https://www.peterparker.com",
        "achievements": [
            "Juara 1 Kompetisi Gulat",
            "Juara 1 Lomba Parkour"
        ],
        "occupations": [
            {
                "id": 1,
                "company_name": "Avengers",
                "occupation_position": "Spider-Man",
                "occupation_start": "2018-04-25T17:00:00.000Z",
                "occupation_end": "2021-12-16T17:00:00.000Z",
                "occupation_status": "Full Time",
                "occupation_achievement": [
                    "Avengers Termuda"
                ],
                "resume_id": 1
            }, ...
        ],
        "educations": [
            {
                "id": 1,
                "education_name": "Midtown High School",
                "education_degree": "SMA",
                "education_faculty": "Ilmu Pengetahuan Alam",
                "education_city": "Queens",
                "education_start": "2016-04-20T17:00:00.000Z",
                "education_end": "2021-12-16T17:00:00.000Z",
                "education_score": 3.95,
                "resume_id": 1
            }, ...
        ]
    }
}

```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "SequelizeValidationError",
    "error": [
        "Must enter a name",
        "Must enter an email address",
        "Must enter a phone number",
        "Phone number must start with +62 or 0 and have at max 13 digits",
        "Must enter a valid LinkedIn URL; Remove the key if you didn't want to put a valid URL",
        "Must enter a valid Portfolio URL; Remove the key if you didn't want to put a valid URL"
    ]
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "SequelizeBulkRecordError",
    "error": [
        "Must enter a score between 0 and 4"
    ]
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "Missing keys",
    "error": {
        "missingKeys": [
            "education_name",
            "education_degree",
            "education_faculty",
            "education_city",
            "education_start",
            "education_end",
            "education_score"
        ],
        "index": 0
    }
}
```

_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "Missing keys",
    "error": {
        "missingKeys": [
            "company_name",
            "occupation_position",
            "occupation_start",
            "occupation_end",
            "occupation_status",
            "occupation_achievement"
        ],
        "index": 0
    }
}
```

<br>

## GET /resumes/get-all-resumes
> Get all resumes

_Request Header_
```
Not needed
```
_Request Body_
```
Not needed
```
_Response (200)_ [Success]
```
{
    "message": "Successfully get all resumes",
    "resumeList": [
        {
            "id": 1,
            "name": "Peter Parker",
            "email": "peter.parker@gmail.com",
            "phone_number": "+6281230493830",
            "linkedin_url": "https://www.linkedin.com/in/peter-parker",
            "portfolio_url": "https://www.peterparker.com",
            "achievements": [
                "Juara 1 Kompetisi Gulat",
                "Juara 1 Lomba Parkour"
            ]
        }, ...
    ]
}
```

<br>

## GET /resumes/find-one-resume/:resume_id
> Get one resume by ID

_Request Header_
```
Not needed
```
_Request Body_
```
Not needed
```
_Response (200)_ [Success]
```
{
    "message": "Successfully found one resume",
    "resume": {
        "id": 1,
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter-parker",
        "portfolio_url": "https://www.peterparker.com",
        "achievements": [
            "Juara 1 Kompetisi Gulat",
            "Juara 1 Lomba Parkour"
        ],
        "occupations": [
            {
                "id": 1,
                "company_name": "Avengers",
                "occupation_position": "Spider-Man",
                "occupation_start": "2018-04-25T17:00:00.000Z",
                "occupation_end": "2021-12-16T17:00:00.000Z",
                "occupation_status": "Full Time",
                "occupation_achievement": [
                    "Avengers Termuda"
                ],
                "resume_id": 1
            }
        ],
        "educations": [
            {
                "id": 1,
                "education_name": "Midtown High School",
                "education_degree": "SMA",
                "education_faculty": "Ilmu Pengetahuan Alam",
                "education_city": "Queens",
                "education_start": "2016-04-20T17:00:00.000Z",
                "education_end": "2021-12-16T17:00:00.000Z",
                "education_score": 3.95,
                "resume_id": 1
            }
        ]
    }
}
```
_Response (404 - Not Found)_ [Failed]
```
{
    "message": "Resume not found"
}
```

<br>

## PUT /resumes/edit-one-resume/:resume_id
> Edit one resume by ID <br>
> If you were to edit a `occupation` or `education` that's already created, add `id` in that index <br>
> If you want to add a new `occupation` or `education`, simply append the new object

_Request Header_
```
Not needed
```
_Request Body_
```
body: {
    "name": "Peter Parker",
    "email": "parker@gmail.com",
    "phone_number": "+6281230493830",
    "linkedin_url": "https://www.linkedin.com/in/peter-parker",
    "portfolio_url": "https://www.peterparker.com",
    "occupations": [
        {
            "id": 1,
            "company_name": "Avengers",
            "occupation_position": "Spider-Man",
            "occupation_start": "2018-04-26T00:00:00+07:00",
            "occupation_end": "2021-12-17T00:00:00+07:00",
            "occupation_status": "Full Time",
            "occupation_achievement": ["Avengers Termuda"]
        },
        {
            "company_name": "Iluminati",
            "occupation_position": "Spider-Man Noir",
            "occupation_start": "2018-04-26T00:00:00+07:00",
            "occupation_end": "2021-12-17T00:00:00+07:00",
            "occupation_status": "Full Time",
            "occupation_achievement": ["Avengers Termuda"]
        }
    ],
    "educations": [
        {
            "id": 1,
            "education_name": "Midtown High School",
            "education_degree": "SMA",
            "education_faculty": "Ilmu Pengetahuan Alam",
            "education_city": "Queens",
            "education_start": "2016-04-21T00:00:00+07:00",
            "education_end": "2021-12-17T00:00:00+07:00",
            "education_score": 3.95
        },
        {
            "education_name": "Midtown High School",
            "education_degree": "SMA",
            "education_faculty": "Ilmu Pengetahuan Alam",
            "education_city": "Queens",
            "education_start": "2016-04-21T00:00:00+07:00",
            "education_end": "2021-12-17T00:00:00+07:00",
            "education_score": 3.95
        }
    ],
    "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
}
```
_Response (200)_ [Success]
```
{
    "message": "Successfully edited one resume",
    "resume": {
        "id": 2,
        "name": "Peter Parker",
        "email": "parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter-parker",
        "portfolio_url": "https://www.peterparker.com",
        "achievements": [
            "Juara 1 Kompetisi Gulat",
            "Juara 1 Lomba Parkour"
        ],
        "occupations": [
            {
                "id": 2,
                "company_name": "Avengers",
                "occupation_position": "Spider-Man",
                "occupation_start": "2018-04-25T17:00:00.000Z",
                "occupation_end": "2021-12-16T17:00:00.000Z",
                "occupation_status": "Full Time",
                "occupation_achievement": [
                    "Avengers Termuda"
                ],
                "resume_id": 2
            },
            {
                "id": 3,
                "company_name": "Iluminati",
                "occupation_position": "Spider-Man Noir",
                "occupation_start": "2018-04-25T17:00:00.000Z",
                "occupation_end": "2021-12-16T17:00:00.000Z",
                "occupation_status": "Full Time",
                "occupation_achievement": [
                    "Avengers Termuda"
                ],
                "resume_id": 2
            }
        ],
        "educations": [
            {
                "id": 2,
                "education_name": "Midtown High School",
                "education_degree": "SMA",
                "education_faculty": "Ilmu Pengetahuan Alam",
                "education_city": "Queens",
                "education_start": "2016-04-20T17:00:00.000Z",
                "education_end": "2021-12-16T17:00:00.000Z",
                "education_score": 3.95,
                "resume_id": 2
            }
        ]
    }
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "SequelizeValidationError",
    "error": [
        "Must enter a name",
        "Must enter an email address",
        "Must enter a phone number"
    ]
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "SequelizeValidationError",
    "error": [
        "Must enter a valid LinkedIn URL; Remove the key if you didn't want to put a valid URL",
        "Must enter a valid Portfolio URL; Remove the key if you didn't want to put a valid URL"
    ]
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "SequelizeBulkRecordError",
    "error": [
        "Must enter a score between 0 and 4"
    ]
}
```
_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "Missing keys",
    "error": {
        "missingKeys": [
            "education_name",
            "education_degree",
            "education_faculty",
            "education_city",
            "education_start",
            "education_end",
            "education_score"
        ],
        "index": 0
    }
}
```

_Response (400 - Bad Request)_ [Failed]
```
{
    "message": "Failed to create new resume",
    "detail": "Missing keys",
    "error": {
        "missingKeys": [
            "company_name",
            "occupation_position",
            "occupation_start",
            "occupation_end",
            "occupation_status",
            "occupation_achievement"
        ],
        "index": 0
    }
}
```

<br>

## DELETE /resumes/delete-one-resume/:resume_id
> Delete one resume by ID

_Request Header_
```
Not needed
```
_Request Body_
```
body: {
	key: value		
}
```
_Response (200)_ [Success]
```
{
    "message": "Successfully deleted one resume"
}
```
_Response (404 - Not Found)_ [Failed]
```
{
    "message": "Resume not found"
}
```