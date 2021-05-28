const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const createError = require('http-errors');
const dotenv = require('dotenv');
const methodOverride = require('method-override');

dotenv.config();
const debug = require('debug')('app');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const categoriesRouter = require('./routes/categories');
const apiRouter = require('./routes/api/api');
const sortMiddleware = require('./middleware/sortMiddleware');

const app = express();
app.log = debug;

app.get('/', (req, res) => {
	res.redirect('/admin');
});

app.engine(
	'hbs',
	exphbs({
		extname: 'hbs',
		helpers: require('./helpers/handlebars'),
	})
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sortMiddleware);
app.use(express.static(path.join(__dirname, 'public')));
app.use('/admin/uploads', express.static('uploads'));
app.use(methodOverride('_method'));

app.use('/admin', indexRouter);
app.use('/admin', usersRouter);
app.use('/admin', productsRouter);
app.use('/admin', categoriesRouter);
app.use('/api', apiRouter);

app.use(function (req, res, next) {
	next(createError(404));
});

app.use(function (err, req, res) {
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	res.status(err.status || 500);
	res.render('error');
});

app.start = (PORT, MONGO_URL) => {
	return new Promise(async (resolve, reject) => {
		await mongoose
			.connect(MONGO_URL, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
			.then(() => {
				debug('Database connect success');
			})
			.catch((err) => {
				debug('Database connection error:' + err);
			});
		const server = app.listen(PORT, (err) => {
			if (err) {
				return reject(err);
			}
			console.log('App started and listening on port', PORT);
			resolve(server);
		});
	});
};

module.exports = app;
