const express = require('express');
const router = express.Router();

/**
 * @param {Object} body
 */
function wrapJson(body) {
	if (body instanceof Error) {
		return {
			header: {
				status: 400,
				errorMessage: `${body.name}: ${body.message}`,
				currentDate: new Date(),
			},
			body,
		};
	}

	return {
		header: {
			status: 200,
			errorMessage: '',
			currentDate: new Date(),
			count: Array.isArray(body) ? body.length : body ? 1 : 0,
		},
		body,
	};
}

router.use((req, res, next) => {
	res.sendRest = (body) => {
		if (body instanceof Error) {
			res.statusCode = 400;
		}
		return res.json(wrapJson(body));
	};
	next();
});

router.get('/', function (req, res) {
	res.sendRest({
		version: '1.0.0',
		title: 'Nordic Shop RESTful API',
		description: 'RESTful API for Web app, OpenAPI compliance',
		contact: 'Nguyen Thanh <ncthanhmh@gmail.com>',
	});
});

require('./api.users')(router);
require('./api.products')(router);
require('./api.categories')(router);

module.exports = router;
