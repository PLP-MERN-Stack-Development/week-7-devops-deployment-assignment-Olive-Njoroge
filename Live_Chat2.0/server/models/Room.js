const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
    name: {type: String, unique: true, required: true}
}, {timestamps: true});

module.exports = mongoose.model("Room", roomSchema);