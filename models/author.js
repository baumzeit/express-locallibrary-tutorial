const mongoose = require('mongoose');
const moment = require('moment');

const { Schema } = mongoose;

const AuthorSchema = new Schema({
	first_name: { type: String, required: true, max: 100 },
	family_name: { type: String, required: true, max: 100 },
	date_of_birth: { type: Date },
	date_of_death: { type: Date },
});

AuthorSchema.virtual('name').get(function() {
	return `${this.family_name}, ${this.first_name}`;
});

AuthorSchema.virtual('year_of_birth').get(function() {
	return this.date_of_birth ? this.date_of_birth.getFullYear() : '';
});

AuthorSchema.virtual('year_of_death').get(function() {
	return this.date_of_death ? this.date_of_death.getFullYear() : '';
});

AuthorSchema.virtual('date_of_birth_input').get(function() {
	return this.date_of_birth
		? moment(this.date_of_birth).format('YYYY-MM-DD')
		: '';
});

AuthorSchema.virtual('date_of_death_input').get(function() {
	return this.date_of_death
		? moment(this.date_of_death).format('YYYY-MM-DD')
		: '';
});

AuthorSchema.virtual('lifespan').get(function() {
	return `${this.year_of_birth} - ${this.year_of_death}`;
});

AuthorSchema.virtual('url').get(function() {
	return `/catalog/author/${this._id}`;
});

module.exports = mongoose.model('Author', AuthorSchema);
