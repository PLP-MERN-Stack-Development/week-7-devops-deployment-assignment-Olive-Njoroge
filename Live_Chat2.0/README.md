# 🧠 Live Chat App (First Fullstack Live Project)

This is my **first fullstack live website**, a real-time chat application built using the **MERN stack** with **Socket.IO** for instant messaging. Users can register, join or create chat rooms, and send/receive messages live.

## 🌐 Live Demo

🔗 [Visit the Live Chat App]([https://your-vercel-link.vercel.app](https://live-chat2-0-qf941xg3h-waigumo.vercel.app/))  
> *(Replace with your actual Vercel frontend link)*

---

## 🛠️ Tech Stack

### Frontend:
- React + Vite  
- Axios  
- Tailwind CSS  

### Backend:
- Node.js + Express  
- Socket.IO  
- CORS  
- MongoDB Atlas (via Mongoose)  

### Hosting:
- Frontend → Vercel  
- Backend → Render  
- Database → MongoDB Atlas  

---

## ✨ Features

- 🔐 User registration (username only)  
- 💬 Real-time messaging via WebSockets  
- 📂 Create and join chat rooms  
- 🟢 Online/offline user indicators  
- 📜 Message history per room  
- ✍️ Typing indicator  

---

## 📦 Installation & Setup (Local Dev)

### 1. Clone this repo

```bash
git clone https://github.com/yourusername/live-chat-app.git
cd live-chat-app
````

### 2. Install frontend dependencies

```bash
cd client
pnpm install
```

### 3. Install backend dependencies

```bash
cd ../server
pnpm install
```

### 4. Environment setup

Create a `.env` file in both `client/` and `server/`:

#### Client `.env`

```env
VITE_API_BASE_URL=https://your-render-backend.onrender.com
```

#### Server `.env`

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
```

### 5. Start development servers

* Frontend: `pnpm run dev` (inside `client/`)
* Backend: `pnpm run dev` (inside `server/`)



## 🙋‍♀️ Author

Built by **Olive Njoroge**
📌 First fullstack project 🎉
