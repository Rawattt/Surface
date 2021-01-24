const errorHandler = (res, error) => {
    // console.log(error);
    // console.log(error.statusCode);
    if (!error.statusCode) {
        return res
            .status(500)
            .json({ error: true, message: 'Something went wrong' });
    }
    switch (error.statusCode) {
        case 401:
            return res.status(error.statusCode).json({
                error: true,
                message: error.message
            });

        case 400:
            return res.status(error.statusCode).json({
                error: true,
                message: error.message
            });

        default:
            return res.status(statusCode).json({
                error: true,
                message: 'Something went wrong'
            });
    }
};

module.exports = errorHandler;
