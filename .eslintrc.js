module.exports = {
	root: true,
	extends: ['eslint:recommended'],
	plugins: [],
	// parser: 'babel-eslint',
	env: { browser: true, node: true, es6: true, jest: true },
	parserOptions: {
		ecmaVersion: 2018,
		sourceType: 'module',
		ecmaFeatures: {
			impliedStrict: true,
		},
	},
	rules: {
		'no-console': 'off',
	},
	settings: {},
};
