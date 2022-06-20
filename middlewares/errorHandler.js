const errorHandler = ((err, req, res, next) => {
    let code = 500;
    let detail = 'Internal server error';
	let error = err
	const { message } = res

	// console.log(error.name)
  
    switch (err.name) {
    	case 'SequelizeValidationError':
        	const sequelizeValidationError = err.errors.map(el => {
				return el.message
			})
			error = sequelizeValidationError
			detail = err.name
			code = 400
        	break;
		
		case 'SequelizeEagerLoadingError':
			code = 400;
			detail = err.message;
			break;
		
		case 'AggregateError':
			code = 400
			const { errors } = err.errors[0].errors
			const aggregateErrors = errors.map(el => {
				return el.message
			})
			error = aggregateErrors
			detail = err.errors[0].name
			break;

		case 'TypeError':
			error = err.message
			detail = err.name
			break;

		case 'ReferenceError' || 'Error':
			detail = err.message
			break;

		case 'ValidatorError': 
			code = 400
			detail = err.detail
			error = {
				missingKeys: err.missingKeys,
				index: err.index
			}
    }
  
    res.status(code).json({
       message,
	   detail,
	   error,
    });
});
  
module.exports = errorHandler;