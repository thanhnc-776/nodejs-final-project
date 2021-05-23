const fs = require('fs');
const Category = require('../models/category');
const mongoose = require('mongoose');

const getCategoryData = JSON.parse(fs.readFileSync('./data/categories.json', 'utf8')).body;

async function createCategory() {
	return await Category.insertMany(getCategoryData);
}

module.exports = createCategory;
