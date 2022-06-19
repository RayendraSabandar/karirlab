async function updateLoops(array, model, t, resume_id) {
    for(let i = 0; i < array.length; i++) {
        const eachElement = array[i]
        const { id } = eachElement

        if(eachElement.id) {
            await model.update(eachElement, {
                returning: true,
                where: {
                    id
                },
                transaction: t
            })
        } else {
            await model.create({
                ...eachElement,
                resume_id
            }, { transaction: t })
        }
    }
}

async function editChild(foundResume, Occupation, occupationArray, Education, educationArray, t, resume_id) {
    if(occupationArray) {
        await updateLoops(occupationArray, Occupation, t, resume_id)
    } else  {
        const ids = foundResume.occupations.map(el => {
            return el.id
        })
        
        if(ids) {
            await Occupation.destroy({ where: { id: ids }})
        }
    }
    
    if(educationArray) {
        await updateLoops(educationArray, Education, t, resume_id)
    } else {
        const ids = foundResume.educations.map(el => {
            return el.id
        })

        if(ids) {
            await Education.destroy({ where: { id: ids }})
        }
    }
}

module.exports = editChild