import { useEffect, useRef, useState } from 'react';

export default function Chat({ room, user, messages, socket }) {
  const [chat, setChat] = useState("");
  const [allMessages, setAllMessages] = useState(messages || []);
  const [typingUser, setTypingUser] = useState("");
  const msgRef = useRef(null);

  useEffect(() => {
    const handleNewMessage = (msg) => {
      setAllMessages((prev) => [...prev, msg]);
    };

    const handleTyping = (username) => {
      setTypingUser(username);
    };

    const handleStopTyping = () => {
      setTypingUser("");
    };

    socket.on("newMessage", handleNewMessage);
    socket.on("typing", handleTyping);
    socket.on("stopTyping", handleStopTyping);

    return () => {
      socket.off("newMessage", handleNewMessage);
      socket.off("typing", handleTyping);
      socket.off("stopTyping", handleStopTyping);
    };
  }, [socket]);

  const handleTyping = () => {
    socket.emit("typing");
    setTimeout(() => socket.emit("stopTyping"), 1000);
  };

  const handleSend = () => {
    if (chat.trim() === "") return;
    socket.emit("sendMessage", chat);
    setChat("");
  };

  return (
    <div>
      <h2 className="text-2xl mb-2">{room.name}</h2>

      <div className="h-64 overflow-y-auto border mb-2 bg-gray-50 p-2" ref={msgRef}>
        {allMessages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.sender?.username || "Anonymous"}:</strong> {msg.content}
          </p>
        ))}
      </div>

      <div className="mb-2 text-sm text-gray-600">
        {typingUser && `${typingUser} is typing...`}
      </div>

      <div className="flex gap-2">
        <input
          className="flex-1 p-2 border rounded"
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={handleTyping}
          placeholder="Type a message"
        />
        <button className="bg-blue-500 text-white px-4 rounded" onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}