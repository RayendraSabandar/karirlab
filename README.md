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
- Open your `postman` application
- Import `JSON` file from `postmanData/karirlab.postman_collection`
- Try to hit one of the five available endpoints

<br>

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

# Keputusan teknis utama yang saya buat
# Komentar relevan tentang hasil anda