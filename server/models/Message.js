const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {type: mongoose.Schema.Types.ObjectId , ref: "User"},
    room : {type: mongoose.Schema.Types.ObjectId, ref: "Room"},
    content: {type: String, require: true}
}, {timestamps: true});

module.exports = mongoose.model("Message", messageSchema)

// You use type: mongoose.Schema.Types.ObjectId in Mongoose schemas to create a reference (or relationship) between documents in different collections.

// 🔑 Why Use mongoose.Schema.Types.ObjectId?
// ✅ 1. To Link Documents (Like Foreign Keys in SQL)
// It allows one document to reference another document using its _id.