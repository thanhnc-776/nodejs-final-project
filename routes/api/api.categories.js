const Category = require('../../models/category');
const collection = 'categories';

module.exports = (router) => {
	router.get(`/${collection}`, (req, res) => {
		Category.find({})
			.exec()
			.then((categories) => {
				res.sendRest(categories);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.post(`/${collection}`, (req, res) => {
		Category.create(req.body)
			.then((newCategory) => {
				res.sendRest(newCategory);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.get(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		Category.findOne({ _id: id })
			.exec()
			.then((category) => {
				res.sendRest(category);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.patch(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		const updatedBody = req.body;
		Category.findByIdAndUpdate(id, updatedBody, { runValidators: true })
			.exec()
			.then((category) => {
				res.sendRest({ ...category.toObject(), ...updatedBody });
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.delete(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		Category.findByIdAndRemove(id)
			.exec()
			.then((category) => {
				res.sendRest(category);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});
};
