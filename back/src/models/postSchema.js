const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    titulo: {
        type: String,
        required: true
    },
    texto: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
});

module.exports = mongoose.model('post', postSchema)