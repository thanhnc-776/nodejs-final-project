const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');

const app = express();
const debug = require('debug')('app');
app.log = debug;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const apiRouter = require('./routes/api/api');
// const sortMiddleware = require('./middleware/sortMiddleware');

// view engine setup
app.engine(
	'hbs',
	exphbs({
		extname: 'hbs',
		helpers: require('./helpers/handlebars'),
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
// app.use(sortMiddleware());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/public')));
app.use('/admin/uploads', express.static('uploads'));

app.get('/', (req, res) => {
	res.redirect('/admin');
});

app.use('/admin', indexRouter);
app.use('/admin', usersRouter);
app.use('/admin', productsRouter);
app.use('/admin', categoriesRouter);
app.use('/api', apiRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

app.start = (PORT, MONGO_URL) => {
	return new Promise(async (resolve, reject) => {
		await mongoose
			.connect(MONGO_URL, {
				useNewUrlParser: true,
				useCreateIndex: true,
				useUnifiedTopology: true,
			})
			.then(() => {
				debug('Database connect success');
			})
			.catch((err) => {
				debug('Database connection error:' + err);
			});
		const server = app.listen(PORT, (err) => {
			if (err) {
				console.log(err);
				return reject(err);
			}
			console.log('App started and listening on port', PORT);
			resolve(server);
		});
	});
};

module.exports = app;
