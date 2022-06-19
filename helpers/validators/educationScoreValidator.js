function educationScoreValidator(score) {
    if(score < 0 || score > 4) {
        throw new Error('Must enter a score between 0 and 4')
    }
}

module.exports = educationScoreValidator