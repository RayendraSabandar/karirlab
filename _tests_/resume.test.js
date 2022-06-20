const app = require("../app");

const { Resume } = require('../models')
const request = require("supertest");

describe("Resume Routes Test", () => {
    const baseURL = '/development/api/v1'

    const createResumeErrors = [
        "Must enter a name",
        "Must enter an email address",
        "Must enter a phone number",
        "Must enter a valid LinkedIn URL; Remove the key if you didn't want to put a valid URL",
        "Must enter a valid Portfolio URL; Remove the key if you didn't want to put a valid URL",
        "Must enter a score between 0 and 4"
    ]

    const occupationMissingKeysErrors = [
        "company_name",
        "occupation_position",
        "occupation_start",
        "occupation_end",
        "occupation_status",
        "occupation_achievement"
    ]

    const educationMissingKeysError = [
        "education_name",
        "education_degree",
        "education_faculty",
        "education_city",
        "education_start",
        "education_end",
        "education_score"
    ]

    const validInputResume = {
        name: "Peter Parker",
        email: "peter.parker@gmail.com",
        phone_number: "+6281230493830",
        linkedin_url: "https://www.linkedin.com/in/peter-parker",
        portfolio_url: "https://www.peterparker.com",
        occupations: [
            {
                company_name: "Avengers",
                occupation_position: "Spider-Man",
                occupation_start: "2018-04-26T00:00:00+07:00",
                occupation_end: "2021-12-17T00:00:00+07:00",
                occupation_status: "Full Time",
                occupation_achievement: ["Avengers Termuda"]
            }
        ],
        educations: [
            {
                education_name: "Midtown High School",
                education_degree: "SMA",
                education_faculty: "Ilmu Pengetahuan Alam",
                education_city: "Queens",
                education_start: "2016-04-21T00:00:00+07:00",
                education_end: "2021-12-17T00:00:00+07:00",
                education_score: 3.95
            }
        ],
        achievements: ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const invalidPhoneNumberInputResume1 = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "6281230493830",
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

    const invalidPhoneNumberInputResume2 = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+628123049383011",
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

    const invalidLinkedInURLInputResume = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter_parker",
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

    const invalidPortfolioURLInputResume = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter_parker",
        "portfolio_url": "https://www.peterparker.comasdf",
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

    const noPrimaryDataInputResume = {
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

    const invalidOccupationKeysInputResume = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter-parker",
        "portfolio_url": "https://www.peterparker.com",
        "occupations": [
            {
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

    const deleteOccupations = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
        "phone_number": "+6281230493830",
        "linkedin_url": "https://www.linkedin.com/in/peter-parker",
        "portfolio_url": "https://www.peterparker.com",
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
            }
        ],
        "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const deleteEducations = {
        "name": "Peter Parker",
        "email": "peter.parker@gmail.com",
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
            }
        ],
        "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const higherThanFourEducationScoreInputResume = {
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
                "education_score": 5
            }
        ],
        "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const lowerThanZeroEducationScoreInputResume = {
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
                "education_score": -1
            }
        ],
        "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const invalidEducationKeysInputResume = {
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
            }
        ],
        "achievements": ["Juara 1 Kompetisi Gulat", "Juara 1 Lomba Parkour"]
    }

    const validInputEditResume = {
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
                "id": 1,
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

    const resume_id = 1
    const invalid_resume_id = 2

    afterAll( async() => {
        await Resume.destroy({ where : {}, cascade : true, truncate: true, restartIdentity : true})
        await new Promise(resolve => setTimeout(() => resolve(''), 1000));
    });

    beforeEach(() => {
        jest.clearAllMocks()
    })

    test("201 Success create a new resume - should return created resume data", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(validInputResume)
            .then((response) => {
                const { body, status } = response;
                const { resume } = body
                expect(status).toBe(201);
                expect(body).toHaveProperty("message", "Successfully created a new resume");
                expect(resume).toHaveProperty('id', expect.any(Number))
                expect(resume).toHaveProperty("name", "Peter Parker");
                expect(resume).toHaveProperty('email', "peter.parker@gmail.com");
                expect(resume).toHaveProperty('phone_number', "+6281230493830");
                expect(resume).toHaveProperty('linkedin_url', "https://www.linkedin.com/in/peter-parker");
                expect(resume).toHaveProperty('portfolio_url', "https://www.peterparker.com");
                expect(resume).toHaveProperty('achievements', validInputEditResume.achievements);
                done()
            });
    });

    test("400 Failed create a new resume with invalid phone number format - should return invalid phone number message", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidPhoneNumberInputResume1)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Phone number must start with +62 or 0 and have at max 13 digits')
                done()
            });
    });

    test("400 Failed create a new resume with more than 13 digits - should return invalid phone number message", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidPhoneNumberInputResume2)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Phone number must start with +62 or 0 and have at max 13 digits')
                done()
            });
    });

    test("400 Failed create a new resume with invalid linkedin URL - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidLinkedInURLInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(createResumeErrors).toEqual(expect.arrayContaining(body.error))
                done()
            });
    });

    test("400 Failed create a new resume with invalid portfolio URL - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidPortfolioURLInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(createResumeErrors).toEqual(expect.arrayContaining(body.error))
                done()
            });
    });

    test("400 Failed create a new resume with no primary data - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(noPrimaryDataInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(createResumeErrors).toEqual(expect.arrayContaining(body.error))
                done()
            });
    });

    test("400 Failed create a new resume with invalid education score (too low) - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(lowerThanZeroEducationScoreInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeBulkRecordError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Must enter a score between 0 and 4')
                done()
            });
    });

    test("400 Failed create a new resume with invalid education score (too high) - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(higherThanFourEducationScoreInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "SequelizeBulkRecordError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Must enter a score between 0 and 4')
                done()
            });
    });
    
    test("400 Failed create a new resume with invalid education keys - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidEducationKeysInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "Missing keys");
                expect(body.error).toHaveProperty("missingKeys", expect.any(Array))
                expect(body.error).toHaveProperty('index', expect.any(Number))
                expect(educationMissingKeysError).toEqual(expect.arrayContaining(body.error.missingKeys))
                done()
            });
    });

    test("400 Failed create a new resume with invalid occupation keys - should return array of error messages", (done) => {
        request(app)
            .post(`${baseURL}/resumes/create-new-resume`)
            .send(invalidOccupationKeysInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to create new resume");
                expect(body).toHaveProperty("detail", "Missing keys");
                expect(body.error).toHaveProperty("missingKeys", expect.any(Array))
                expect(body.error).toHaveProperty('index', expect.any(Number))
                expect(occupationMissingKeysErrors).toEqual(expect.arrayContaining(body.error.missingKeys))
                done()
            });
    });

    test("200 Success get all resumes - should return all recorded resumes", (done) => {
        request(app)
            .get(`${baseURL}/resumes/get-all-resumes`)
            .then((response) => {
                const { body, status } = response;
                expect(body).toHaveProperty("message", "Successfully get all resumes");
                expect(body).toHaveProperty("resumeList", expect.any(Array));
                done()
            })
    })

    test("200 Success find one resume - should return a resume object", (done) => {
        request(app)
            .get(`${baseURL}/resumes/find-one-resume/1`)
            .then((response) => {
                const { body, status } = response;
                const { resume } = body
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Successfully found one resume");
                expect(resume).toHaveProperty('id', expect.any(Number))
                expect(resume).toHaveProperty("name", "Peter Parker");
                expect(resume).toHaveProperty('email', "peter.parker@gmail.com");
                expect(resume).toHaveProperty('phone_number', "+6281230493830");
                expect(resume).toHaveProperty('linkedin_url', "https://www.linkedin.com/in/peter-parker");
                expect(resume).toHaveProperty('portfolio_url', "https://www.peterparker.com");
                expect(resume).toHaveProperty('achievements', validInputEditResume.achievements);
                done()
            })
    })

    test("404 Failed find one resume - should return not found message", (done) => {
        request(app)
            .get(`${baseURL}/resumes/find-one-resume/${invalid_resume_id}`)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Resume not found");
                done()
            })
    })

    test("200 Success edit one resume - should return a resume object", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(validInputEditResume)
            .then((response) => {
                const { body, status } = response;
                const { resume } = body
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Successfully edited one resume");
                expect(resume).toHaveProperty('id', expect.any(Number))
                expect(resume).toHaveProperty("name", "Peter Parker");
                expect(resume).toHaveProperty('email', "parker@gmail.com");
                expect(resume).toHaveProperty('phone_number', "+6281230493830");
                expect(resume).toHaveProperty('linkedin_url', "https://www.linkedin.com/in/peter-parker");
                expect(resume).toHaveProperty('portfolio_url', "https://www.peterparker.com");
                expect(resume).toHaveProperty('achievements', validInputEditResume.achievements);
                done()
            })
    })
    
    test("200 Success edit one resume (delete occupations) - should return a resume object", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(deleteOccupations)
            .then((response) => {
                const { body, status } = response;
                const { resume } = body
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Successfully edited one resume");
                expect(resume).toHaveProperty('id', expect.any(Number))
                expect(resume).toHaveProperty("name", "Peter Parker");
                expect(resume).toHaveProperty('email', "peter.parker@gmail.com");
                expect(resume).toHaveProperty('phone_number', "+6281230493830");
                expect(resume).toHaveProperty('linkedin_url', "https://www.linkedin.com/in/peter-parker");
                expect(resume).toHaveProperty('portfolio_url', "https://www.peterparker.com");
                expect(resume).toHaveProperty('achievements', validInputEditResume.achievements);
                expect(resume).toHaveProperty('educations', expect.any(Array));
                done()
            })
    })

    test("200 Success edit one resume (delete educations) - should return a resume object", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(deleteEducations)
            .then((response) => {
                const { body, status } = response;
                const { resume } = body
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Successfully edited one resume");
                expect(resume).toHaveProperty('id', expect.any(Number))
                expect(resume).toHaveProperty("name", "Peter Parker");
                expect(resume).toHaveProperty('email', "peter.parker@gmail.com");
                expect(resume).toHaveProperty('phone_number', "+6281230493830");
                expect(resume).toHaveProperty('linkedin_url', "https://www.linkedin.com/in/peter-parker");
                expect(resume).toHaveProperty('portfolio_url', "https://www.peterparker.com");
                expect(resume).toHaveProperty('achievements', validInputEditResume.achievements);
                expect(resume).toHaveProperty('occupations', expect.any(Array));
                done()
            })
    })

    test("404 Failed edit one resume - should return not found message", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${invalid_resume_id}`)
            .send(validInputEditResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Resume not found");
                done()
            })
    })

    test("400 Failed edit one resume with invalid phone number format - should return invalid phone number message", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(invalidPhoneNumberInputResume1)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to edit one resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Phone number must start with +62 or 0 and have at max 13 digits')
                done()
            });
    });

    test("400 Failed edit one resume with more than 13 digits - should return invalid phone number message", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(invalidPhoneNumberInputResume2)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to edit one resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Phone number must start with +62 or 0 and have at max 13 digits')
                done()
            });
    });

    test("400 Failed edit one resume with invalid education score (too low) - should return array of error messages", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(lowerThanZeroEducationScoreInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to edit one resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Must enter a score between 0 and 4')
                done()
            });
    });

    test("400 Failed edit one resume with invalid education score (too high) - should return array of error messages", (done) => {
        request(app)
            .put(`${baseURL}/resumes/edit-one-resume/${resume_id}`)
            .send(higherThanFourEducationScoreInputResume)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", "Failed to edit one resume");
                expect(body).toHaveProperty("detail", "SequelizeValidationError");
                expect(body).toHaveProperty("error", expect.any(Array))
                expect(body.error[0]).toEqual('Must enter a score between 0 and 4')
                done()
            });
    });
    

    test("200 Success delete one resume - should return success message", (done) => {
        request(app)
            .delete(`${baseURL}/resumes/delete-one-resume/${resume_id}`)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(200);
                expect(body).toHaveProperty("message", "Successfully deleted one resume");
                done()
            })
    })

    test("404 Failed delete one resume - should return not found message", (done) => {
        request(app)
            .delete(`${baseURL}/resumes/delete-one-resume/${invalid_resume_id}`)
            .then((response) => {
                const { body, status } = response;
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Resume not found");
                done()
            })
    })


})