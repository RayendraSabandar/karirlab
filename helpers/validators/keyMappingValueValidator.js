const validKeys = {
    occupation: [
        "company_name",
        "occupation_position",
        "occupation_start",
        "occupation_end",
        "occupation_status",
        "occupation_achievement"
    ],
    education: [
        "education_name",
        "education_degree",
        "education_faculty",
        "education_city",
        "education_start",
        "education_end",
        "education_score"
    ]
}

function keyValidator(field, object) {
    const missingKeys = []
    const objectKeys = Object.keys(object)

    for(let i = 0; i < validKeys[field].length; i++) {
        const eachValidKeys = validKeys[field][i]
        const isValid = objectKeys.includes(eachValidKeys)

        if(!isValid) missingKeys.push(eachValidKeys)
    }

    if(missingKeys.length == 0) {
        return true
    } else return missingKeys
}

module.exports = keyValidator