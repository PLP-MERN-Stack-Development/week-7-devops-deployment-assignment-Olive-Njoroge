const Message = require('../models/Message');

// GET all messages in a room
exports.getRoomMessages = async (req, res) => {
    try {
        const roomId = req.params.roomId;

        const messages = await Message.find({ room: roomId })
            .populate('sender', 'username')
            .sort({ createdAt: 1 });


        res.status(200).json(messages);
    } catch (error) {
        console.error("Error fetching messages:", error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// Great question!

// js
// Copy
// Edit
// { room: roomId }
// This is a MongoDB query object used with Mongoose. Let’s break it down:

// 🔍 What it means:
// room is the field name in your Message model.

// roomId is a variable that holds the actual ObjectId value you're searching for (e.g., "64a9f5c...ab").

// So you're telling Mongoose:

// "Find all messages where the room field equals the value in roomId."


// // CREATE a new message
// exports.createMessage = async (req, res) => {
//     try {
//         const { sender, room, content } = req.body;

//         if (!sender || !room || !content) {
//             return res.status(400).json({ error: "All fields are required." });
//         }

//         const message = await Message.create({ sender, room, content });
//         const populatedMessage = await message.populate('sender', 'username');

//         res.status(201).json(populatedMessage);
//     } catch (error) {
//         console.error("Error creating message:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

// // DELETE a message by ID
// exports.deleteMessage = async (req, res) => {
//     try {
//         const messageId = req.params.id;

//         const deleted = await Message.findByIdAndDelete(messageId);

//         if (!deleted) {
//             return res.status(404).json({ error: "Message not found" });
//         }

//         res.status(200).json({ message: "Message deleted successfully" });
//     } catch (error) {
//         console.error("Error deleting message:", error.message);
//         res.status(500).json({ error: "Internal Server Error" });
//     }
// };

