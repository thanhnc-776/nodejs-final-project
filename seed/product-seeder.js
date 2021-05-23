const fs = require('fs');
const Product = require('../models/product');
const mongoose = require('mongoose');

const getProductData = JSON.parse(fs.readFileSync('./data/product.json', 'utf8')).body;

async function createProduct() {
	return await Product.insertMany(getProductData);
}
module.exports = createProduct;
