/*
 * Module that allows us not to repeat catch block on every function
 * If an error is caught, it will be redirected to AppError class
 * cf server/app.js  --line 30
*/
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    };
};
