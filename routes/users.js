const express = require('express');
const router = express.Router();
const User = require('../models/user');
const mongoose = require("mongoose");

const upload = require('../utils/multer');
const cloudinary = require('../utils/cloudinary');

router.get('/users', async (req, res) => {
	const userQuery = User.find({}).lean();

	req.query.hasOwnProperty('_sort')
		? await userQuery
				.sortable(req)
				.then((users) => res.render('users', { title: 'Users', users }))
				.catch((err) => console.log(err))
		: await userQuery
				.then((users) => res.render('users', { title: 'Users', users }))
				.catch((err) => console.log(err));
});

router.get('/users/create', async (req, res) => {
	res.render('create-user', { title: 'Create User' });
});

router.post('/users/create', upload.single('avatar'), async (req, res) => {
	try {
		const result = await cloudinary.uploader.upload(req.file.path);
    let newId = new mongoose.Types.ObjectId().toHexString();
		let user = new User({
			...req.body,
      _id: newId,
			avatar: result.secure_url,
		});
		await user
			.save()
			.then((user) => res.redirect(`/admin/users`))
			.catch((err) => console.log(err));
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
