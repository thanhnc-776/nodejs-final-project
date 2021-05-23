const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const multer = require('multer');

const Storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});
const upload = multer({ storage: Storage, limits: { fileSize: 1024 * 1024 * 2 } });

router.get('/products', async (req, res) => {
  await Product.find({})
		.lean()
		.then((products) => res.render('products', { title: 'Products', products }))
		.catch((err) => console.log(err));
	// let { page, size } = parseInt(req.query);
	// let skip = (page - 1) * size;

	// if (req.query.hasOwnProperty('_sort')) {
	// 	await Product.find({})
	// 		.lean()
	// 		.sortable(req)
	// 		.skip(skip)
	// 		.limit(size)
	// 		.then((products) => res.render('products', { title: 'Products', products }))
	// 		.catch((err) => console.log(err));
	// } else {
	// 	await Product.find({})
	// 		.lean()
	// 		.skip(skip)
	// 		.limit(size)
	// 		.then((products) => res.render('products', { title: 'Products', products }))
	// 		.catch((err) => console.log(err));
	// }
});

router.get('/products/create', async (req, res) => {
	res.render('create-product', { title: 'Create Products' });
});

router.post('/products/create', upload.single('image'), async (req, res) => {
	const userDetails = req.body;
	const imageFile = req.file;
	const { path: filePath } = imageFile;

	const product = new Product({ thumbnail: filePath, ...userDetails });
	product
		.save()
		.then((product) => res.redirect(`/products/${product._id}`))
		.catch((err) => console.log(err));
});

router.get('/products/:id', async (req, res) => {
	await Product.findById(req.params.id)
		.lean()
		.then((product) => res.render('detail-product', { title: 'Detail Products', product }))
		.catch((err) => console.log(err));
});

router.put('/products/:id', async (req, res) => {
	await Product.updateOne({ _id: req.params.id }, req.body)
		.then(() => res.redirect('/products'))
		.catch((err) => console.log(err));
});

router.delete('/products/:id', async (req, res) => {
	Product.deleteOne({ _id: req.params.id })
		.then(() => res.redirect('back'))
		.catch((err) => console.log(err));
});

module.exports = router;
