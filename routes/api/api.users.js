const User = require('../../models/user');
const collection = 'users';

module.exports = (router) => {
	router.get(`/${collection}`, (req, res) => {
		User.find({})
			.exec()
			.then((users) => {
				res.sendRest(users);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.post(`/${collection}`, (req, res) => {
		User.create(req.body)
			.then((newUser) => {
				res.sendRest(newUser);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.get(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		User.findOne({ _id: id })
			.exec()
			.then((user) => {
				res.sendRest(user);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.patch(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		const updatedBody = req.body;
		User.findByIdAndUpdate(id, updatedBody, { runValidators: true })
			.exec()
			.then((user) => {
				res.sendRest({ ...user.toObject(), ...updatedBody });
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});

	router.delete(`/${collection}/:id`, (req, res) => {
		const id = req.params.id;
		User.findByIdAndRemove(id)
			.exec()
			.then((user) => {
				res.sendRest(user);
			})
			.catch((err) => {
				res.sendRest(err);
			});
	});
};
