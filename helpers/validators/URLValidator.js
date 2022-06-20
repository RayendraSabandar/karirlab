function linkedInValidator(linkedin_url) {
    var linkedInRegex = /^((http:|https:)\/\/(www\.|)|linkedin.com\/in|www.|)(linkedin.com\/in\/)[A-Za-z0-9-]+$/
    if(!linkedInRegex.test(linkedin_url)) {
        throw new Error('Must enter a valid LinkedIn URL');
    } 
}

function portfolioValidator(portfolio_url){
    var urlRegex = /^(https:\/\/www\.|http:\/\/www\.|www\.|https:\/\/|http:\/\/)[a-zA-Z0-9_-]+\.[a-zA-Z]{2,5}$/
    if(!urlRegex.test(portfolio_url)) {
        throw new Error('Must enter a valid Portfolio URL')
    }
}

module.exports = {
    linkedInValidator,
    portfolioValidator
}