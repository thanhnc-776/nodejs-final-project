const express = require('express');
const router = express.Router();
const Product = require('../models/product');

const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');

router.get('/products', async (req, res) => {
	if (req.query.hasOwnProperty('_sort')) {
		await Product.find({})
			.lean()
			.sortable(req)
			.then((products) => res.render('products', { title: 'Products', products }))
			.catch((err) => console.log(err));
	} else {
		await Product.find({})
			.lean()
			.then((products) => res.render('products', { title: 'Products', products }))
			.catch((err) => console.log(err));
	}
});

router.get('/products/create', async (req, res) => {
	res.render('create-product', { title: 'Create Products' });
});

router.post('/products/create', upload.single('image'), async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);

		let product = new Product({
			name: req.body.name,
			thumbnail: result.secure_url,
			shortDescription: req.body.shortDescription,
			categoryId: req.body.categoryId,
			salePrice: req.body.salePrice,
			originalPrice: req.body.originalPrice,
			cloudinary_id: result.public_id,
		});
		await product
			.save()
			.then((product) => res.redirect(`/admin/products/${product._id}`))
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(error);
	}
});

router.get('/products/:id', async (req, res) => {
	await Product.findById(req.params.id)
		.lean()
		.then((product) => res.render('detail-product', { title: 'Detail Products', product }))
		.catch((err) => console.log(err));
});

router.put('/products/:id', async (req, res) => {
	await Product.updateOne({ _id: req.params.id }, req.body)
		.then(() => res.redirect('/admin/products'))
		.catch((err) => console.log(err));
});

router.delete('/products/:id', async (req, res) => {
	Product.deleteOne({ _id: req.params.id })
		.then(() => res.redirect('back'))
		.catch((err) => console.log(err));
});

module.exports = router;
