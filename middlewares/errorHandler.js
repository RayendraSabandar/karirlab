const errorHandler = ((err, req, res, next) => {
    let code = 500;
    let detail = 'Internal server error';
	let error = err
	const { message } = res

	console.log(error)
  
    switch (err.name) {
    	case 'SequelizeValidationError':
        	const arrayOfErrors = err.errors.map(el => {
				return el.message
			})
			error = arrayOfErrors
        	break;
		
		case 'SequelizeEagerLoadingError':
			code = 400;
			detail = err.message;
			break;

		case 'ReferenceError':
			detail = err.message
    }
  
    res.status(code).json({
       message,
	   detail,
	   error,
    });
});
  
module.exports = errorHandler;