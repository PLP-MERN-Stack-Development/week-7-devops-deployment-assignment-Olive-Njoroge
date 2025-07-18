import { useEffect, useState } from 'react';
import {
  getRooms,
  createRoom,
  getMessages,
  socket,
} from '../services/api';
import ChatRoom from '../components/ChatRoom';

export default function Home({ user }) {
  const [rooms, setRooms] = useState([]);
  const [newRoomName, setNewRoomName] = useState('');
  const [currentRoom, setCurrentRoom] = useState(null);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchRooms();
    socket.connect();

    // Listen for users joining or disconnecting
    socket.on('userJoined', ({ user: joinedUser }) => {
      setUsers((prev) => {
        const exists = prev.find((u) => u._id === joinedUser._id);
        if (exists) {
          return prev.map((u) =>
            u._id === joinedUser._id ? { ...u, isOnline: true } : u
          );
        } else {
          return [...prev, joinedUser];
        }
      });
    });

    socket.on('userOffline', (username) => {
      setUsers((prev) =>
        prev.map((u) =>
          u.username === username ? { ...u, isOnline: false } : u
        )
      );
    });

    return () => {
      socket.disconnect();
      socket.off('userJoined');
      socket.off('userOffline');
    };
  }, []);

  const fetchRooms = async () => {
  try {
    const res = await getRooms();
    console.log("Fetched rooms:", res.data); // Debug log
    const roomList = Array.isArray(res.data) ? res.data : res.data?.rooms || [];
    setRooms(roomList);
  } catch (error) {
    console.error('Failed to fetch rooms:', error);
    setRooms([]); // fallback to avoid crash
  }
};

  const handleCreateRoom = async () => {
    if (!newRoomName.trim()) return;
    try {
      const res = await createRoom(newRoomName);
      setRooms((prev) => [...prev, res.data]);
      setNewRoomName('');
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const handleJoinRoom = async (room) => {
    try {
      socket.emit('joinRoom', {
        username: user.username,
        roomId: room._id,
      });

      setCurrentRoom(room);

      const res = await getMessages(room._id);
      const safeMessages = Array.isArray(res?.data) ? res.data : [];
      setMessages(safeMessages);
    } catch (error) {
      console.error('Failed to join room or fetch messages:', error);
      setMessages([]);
    }
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 bg-gray-800 text-white p-4">
        <h2 className="text-lg font-bold mb-4">Chat Rooms</h2>

        {/* Create Room */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="New room name"
            className="w-full p-2 mb-2 rounded text-black"
            value={newRoomName}
            onChange={(e) => setNewRoomName(e.target.value)}
          />
          <button
            onClick={handleCreateRoom}
            className="w-full bg-blue-500 p-2 rounded"
          >
            Create Room
          </button>
        </div>

        {/* Room List */}
        <ul className="mb-6">
          {rooms.length === 0 ? (
            <li className="text-gray-400">No rooms available.</li>
          ) : (
            rooms.map((room) => (
              <li key={room._id} className="mb-2">
                <button
                  onClick={() => handleJoinRoom(room)}
                  className="w-full bg-gray-700 p-2 rounded hover:bg-gray-600"
                >
                  {room.name}
                </button>
              </li>
            ))
          )}
        </ul>

        {/* User List */}
        <h2 className="text-lg font-bold mb-2">Users</h2>
        <ul>
          {users
              .filter(Boolean) // remove null/undefined users
              .map((u) => (
                <li key={u._id || u.username} className="flex items-center gap-2 mb-2">
                  <span
                    className={`h-3 w-3 rounded-full ${
                      u?.isOnline ? 'bg-green-500' : 'bg-gray-400'
                    }`}
                  ></span>
                  <span>{u?.username || 'Unknown User'}</span>
                </li>
            ))}

        </ul>
      </aside>

      {/* Main Chat View */}
      <main className="flex-1 p-4">
        {currentRoom ? (
          <ChatRoom
            room={currentRoom}
            messages={messages}
            user={user}
            socket={socket}
          />
        ) : (
          <p className="text-gray-600">Select or create a room to join.</p>
        )}
      </main>
    </div>
  );
}
