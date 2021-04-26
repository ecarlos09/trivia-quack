const express = require('express');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());
// Set up root route
server.get('/', (req, res) => res.send('Welcome'));

// Game server setup
const gameServer = require("http").createServer(server);
// const gamesRoutes = require('./mvc/routes/gamesRoutes');
// server.use('/games', gamesRoutes);
    // Integrate http server with new instance of socket.io
const io = require('socket.io')(gameServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Add socket connection
io.on('connection', socket => {

    socket.on('create', (roomId) => {
        console.log(`Room with id ${roomId} has been created!`);
        socket.join(roomId);
        io.to(roomId).emit('admin-message', `${socket.id} has joined`);
        io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0);
        socket.on('new-message', ({ username, message }) => {
            io.in(roomId).emit('incoming-message', { username, message })
        });
        // *******************************************************************************************************************
        // HANDLE FOR NEW USER ENTERING ROOM
        socket.on("disconnect", () => {
            io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0);
            io.to(roomId.emit('admin-message', `${socket.id} has left`))
        });
    });

});

const gamesController = require("./controllers/games")
server.use('/games', gamesController)

module.exports = server;
