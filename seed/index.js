const mongoose = require('mongoose');
const createCategory = require('./category-seeder');
const createProduct = require('./product-seeder');
const createUser = require('./user-seeder');

const MONGO_URL =
	process.env.MONGO_URL ||
	'mongodb+srv://user:1234@cluster0.p5kbe.gcp.mongodb.net/mydatabase?retryWrites=true&w=majority';

const mongooseData = mongoose
	.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(async () => {
		console.log('connection to db successfully!');
		Promise.all([createCategory(), createProduct(), createUser()]).then(() =>
			console.log('Create Data Successfully!')
		);
	})
	.catch((err) => console.log(err));

module.exports = mongooseData;
