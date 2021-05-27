const Product = require('../../models/product');
const collection = 'products';

module.exports = (router) => {
	router.get(`/${collection}`, (req, res) => {
		let filter = req.query.filter || '';
		let keyword = req.query.search || '';
		if (filter) {
			filter = JSON.parse(filter);
			let { offset = 0, limit = 10, page = 1 } = filter;
			offset < 0 ? (offset = 0) : offset;
			limit < 0 ? (limit = 0) : limit;
			page < 0 ? (page = 0) : page;

			Product.find({})
				.lean()
				.skip(offset)
				.limit(limit)
				.then((products) => res.json(products))
				.catch((err) => console.log(err));
		} else if (keyword) {
			Product.find({
				name: { $regex: keyword || '', $options: 'i' },
			})
				.lean()
				.then((products) => res.json(products))
				.catch((err) => console.log(err));
		} else {
			Product.find({})
				.lean()
				.then((products) => res.json({products, total: products.length}))
				.catch((err) => console.log(err));
		}
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
