function linkedInValidator(linkedin_url) {
    var result = false
    if (!result) {
        throw new Error('Must enter a valid LinkedIn URL')
    }
}

function portfolioValidator(portfolio_url){
    var result = false
    if(!result){
        throw new Error('Must enter a valid Portfolio URL')
    }
}

module.exports = {
    linkedInValidator,
    portfolioValidator
}