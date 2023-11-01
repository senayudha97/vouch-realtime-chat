const express = require("express");
const cors = require("cors");
const db = require("./app/models/index");
const http = require("http"); // Import modul http
const { Server } = require("socket.io");
const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

// Database Connection
const mongooseConfig = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
db.mongoose
  .connect(db.url, mongooseConfig)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
    process.exit();
  });

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});
require("./app/routes/rooms.routes")(app);
require("./app/routes/messages.routes")(app);

// Create a new HTTP server using the express app
const server = http.createServer(app);

// Setup Socket.io on the server
const io = new Server(server, {
  cors: {
    origin: process.env.BASE_URL, // Sesuaikan dengan alamat asal aplikasi React Anda
    methods: ["GET", "POST"],
  },
});

// Socket Connection
const activeUsers = {};

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (message) => {
    console.log("Received message:", message);
    io.emit("chat message", message);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
