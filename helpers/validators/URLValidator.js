function linkedInValidator(linkedin_url) {
    var result = true
    if (!result) {
        throw new Error('Must enter a valid LinkedIn URL')
    }
}

function portfolioValidator(portfolio_url){
    var result = true
    if(!result){
        throw new Error('Must enter a valid Portfolio URL')
    }
}

// Coba kelarin

module.exports = {
    linkedInValidator,
    portfolioValidator
}