const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const Category = require('../models/category');
const User = require('../models/user');

router.get('/', async (req, res) => {
	let products = await Product.countDocuments({});
	let categories = await Category.countDocuments({});
	let users = await User.countDocuments({});
	res.render('dashboard', {
		title: 'Dashboard',
		products,
		categories,
		users,
	});
});

router.get('/orders', (req, res) => {
	res.render('orders', { title: 'Orders' });
});

router.get('/404', (req, res) => {
	res.render('404', { title: '404' });
});

router.get('/blank', (req, res) => {
	res.render('blank', { title: 'Blank' });
});

router.get('/login', (req, res) => {
	res.render('login', { layout: 'form', title: 'Login' });
});

router.get('/register', (req, res) => {
	res.render('register', { layout: 'form', title: 'Register' });
});

router.get('/forgot-password', (req, res) => {
	res.render('forgot-password', { layout: 'form', title: 'Forgot Password' });
});

module.exports = router;
