const Product = require('../../models/product');
const collection = 'products';

module.exports = (router) => {
	router.get(`/${collection}`, (req, res) => {
		Product.find({})
			.exec()
			.then((products) => {
				res.sendRest(products);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.post(`/${collection}`, (req, res) => {
		Product.create(req.body)
			.then((newProduct) => {
				res.sendRest(newProduct);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.get(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		Product.findOne({ _id: id })
			.exec()
			.then((product) => {
				res.sendRest(product);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.patch(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		const updatedBody = req.body;
		Product.findByIdAndUpdate(id, updatedBody, { runValidators: true })
			.exec()
			.then((product) => {
				res.sendRest({ ...product.toObject(), ...updatedBody });
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.delete(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		Product.findByIdAndRemove(id)
			.exec()
			.then((product) => {
				res.sendRest(product);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});
};
