const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Definición de la estructura del collection
const mySchema = new Schema({
    name: String,
});

const model = mongoose.model('User', mySchema);

module.exports = model;

