const express = require('express');
const router = express.Router();
const User = require('../models/user');
const multer = require('multer');

const Storage = multer.diskStorage({
	destination: 'uploads',
	filename: (req, file, cb) => {
		cb(null, Date.now() + '-' + file.originalname);
	},
});
const upload = multer({ storage: Storage, limits: { fileSize: 1024 * 1024 * 2 } });

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
	const userDetails = req.body;
	const avatarFile = req.file;
	const { path: filePath } = avatarFile;

	const user = new User({ avatar: filePath, ...userDetails });
	user
		.save()
		.then((user) => res.redirect('/users'))
		.catch((err) => console.log(err));

	// await User.updateOne(
	// 	{ _id: userDetails.id },
	// 	{ avatar: `${req.headers.origin}/images/${userDetails.id + '-' + originalname}` }
	// );
	// res.status(200).json({ status: 'Update completed', statusCode: 200 });
});

module.exports = router;
