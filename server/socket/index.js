const Message = require('../models/Message');
const User = require('../models/User');

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("✅ Socket connected", socket.id);

    // Global user variable per socket
    let currentUser = null;

    socket.on("joinRoom", async ({ username, roomId }) => {
      const user = await User.findOneAndUpdate(
        { username },
        { socketId: socket.id, isOnline: true },
        { new: true }
      );

      currentUser = user; // 🔥 store the user in socket scope

      socket.join(roomId);
      io.to(roomId).emit("userJoined", { user, roomId });

      // Typing events
      socket.on("typing", () => {
        socket.to(roomId).emit("typing", username);
      });

      socket.on("stopTyping", () => {
        socket.to(roomId).emit("stopTyping", username);
      });

      // Send message
      socket.on("sendMessage", async (data) => {
        if (!currentUser) {
          console.error("❌ Cannot send message: user is null");
          return;
        }

        const message = await Message.create({
          sender: currentUser._id,
          room: roomId,
          content: data,
        });

        const fullMessage = await message.populate("sender", "username");
        io.to(roomId).emit("newMessage", fullMessage);
      });

      // Disconnect
      socket.on("disconnect", async () => {
        const offlineUser = await User.findOneAndUpdate(
          { socketId: socket.id },
          { isOnline: false },
          { new: true }
        );

        if (offlineUser) {
          io.emit("userOffline", offlineUser.username);
        }
      });
    });
  });
};

module.exports = handleSocketConnection;
