const fs = require('fs');
const User = require('../models/user');
const mongoose = require('mongoose');

const getUsersData = JSON.parse(fs.readFileSync('./data/users.json', 'utf8')).body;

async function createUser() {
	return await User.insertMany(getUsersData);
}
module.exports = createUser;
