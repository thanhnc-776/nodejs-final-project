const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
	_id: String,
	name: String,
	description: String,
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
