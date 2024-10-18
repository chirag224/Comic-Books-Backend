const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

// define the schema for comic books
const comicBookSchema = new mongoose.Schema({
    bookName: { type: String, required: true }, // name of the comic book
    authorName: { type: String, required: true }, // name of the author
    yearOfPublication: { type: Number, required: true }, // year the comic was published
    price: { type: Number, required: true }, // price of the comic book
    discount: { type: Number }, // discount on the comic book, if any
    numberOfPages: { type: Number, required: true }, // number of pages in the comic
    condition: { type: String, enum: ['new', 'used'], required: true }, // condition of the comic
    description: { type: String }, // brief description of the comic book
}, { timestamps: true }); // automatically add createdAt and updatedAt fields

// apply the pagination plugin to the schema
comicBookSchema.plugin(mongoosePaginate);

// create and export the comic book model
const comicBook = mongoose.model('comicBook', comicBookSchema);
module.exports = comicBook;
