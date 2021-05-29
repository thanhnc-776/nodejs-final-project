const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const SchemaTypes = mongoose.SchemaTypes;

const ProductSchema = new Schema({
	name: String,
	image: String,
	thumbnail: String,
	shortDescription: String,
	salePrice: Number,
	originalPrice: SchemaTypes.Number,
	images: [SchemaTypes.String],
	thumbnails: [SchemaTypes.String],
  cloudinary_id: String,
	categoryId: {
		type: SchemaTypes.String,
		ref: 'Category',
		localField: 'categoryId',
		foreignField: '_id',
	},
});

ProductSchema.virtual('saleOff').get(function () {
	return this.originalPrice ? (this.originalPrice - this.salePrice) / this.originalPrice : 0;
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;
