const mongoose = require('mongoose');
const Category = require('../models/category');
const Product = require('../models/product');
const User = require('../models/user');

const MONGO_URL =
	process.env.MONGO_URL ||
	'mongodb+srv://user:1234@cluster0.p5kbe.gcp.mongodb.net/mydatabase?retryWrites=true&w=majority';

const deleteData = mongoose
	.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
	.then(() => {
		Promise.all([User.deleteMany({}), Category.deleteMany({}), Product.deleteMany({})]).then(() =>
			console.log('Delete Data Successfully!')
		);
	})
	.catch((err) => console.log(err));

module.exports = deleteData;
