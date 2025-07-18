const express = require('express');
const http = require('http');
const cors = require('cors');
const {Server} = require('socket.io');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
dotenv.config();


const app =express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {origin: "*"}
});

//SocketIO
require('./socket')(io);

//Middleware
app.use(cors());
app.use(express.json());

//routes
app.use("/api/auth", require('./routes/authRoutes'));
app.use("/api/rooms", require('./routes/roomRoutes'));
app.use("/api/messages", require('./routes/messageRoutes'))

//ConnectDB and start
connectDB();
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})