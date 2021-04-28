const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

io.on('connection', socket => {

    socket.on('create', (roomId) => {
        console.log('created room', roomId)
        socket.join(roomId);
        console.log(Array.from(io.sockets.adapter.rooms.get(roomId)))
        io.to(roomId).emit('players-in-room', Array.from(io.sockets.adapter.rooms.get(roomId)))
        // io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0)
        socket.on('new-message', ({ username, message }) => {
            io.in(roomId).emit('incoming-message', { username, message });
        })

        //handle ready function
        socket.on('ready', (socketId) => {
            console.log(socketId + " is ready!")
            io.to(roomId).emit('player-ready', socketId)
        })
    // *************************************************************************************
        // HANDLE USER ENTERS ROOM
        socket.on("disconnect", () => {
            // io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0)
            if (io.sockets.adapter.rooms.get(roomId)) {
                io.to(roomId).emit('players-in-room', Array.from(io.sockets.adapter.rooms.get(roomId)))
            }
            // io.to(roomId).emit('admin-message', `${socket.id} has left`)
        });
    })
});

module.exports = httpServer;