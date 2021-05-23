const express = require('express');
const router = express.Router();
const Category = require('../models/category');

router.get('/categories', async (req, res) => {
	await Category.find({})
		.lean()
		.then((categories) => res.render('categories', { title: 'Categories', categories }));
});

module.exports = router;
