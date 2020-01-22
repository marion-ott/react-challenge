const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

//On définit notre objet express nommé app
const app = express();
const AppError = require('./services/appError')

//Body Parser
const urlencodedParser = bodyParser.urlencoded({
    extended: true
});
app.use(urlencodedParser);
app.use(bodyParser.json());
app.use(morgan('dev'))
app.use(cors())

// Router imports
const userRouter = require('./routes/userRoutes')
app.use("/api/v1/users", userRouter);

const skillRouter = require('./routes/skillRoutes')
app.use("/api/v1/skills", skillRouter);


/**
 * Data import router
 * Only to be used for inserting / deleting original data
*/
const dataRouter = require('./routes/dataRoutes')
app.use("/api/v1/data", dataRouter)



// create new appError if an error is caught during an operation
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server.`, 404));
});

module.exports = app;
