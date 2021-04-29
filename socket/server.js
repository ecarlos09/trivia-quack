const httpServer = require("http").createServer();

const io = require("socket.io")(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

const socketArray = []

io.on('connection', socket => {

    socket.on('create', (roomId) => {
        console.log('created room', roomId)
        socket.join(roomId);

        socketArray.push({
          room: roomId,
          id: socket.id,
          icon: Math.floor(Math.random() * 10),
        });

        console.log(Array.from(io.sockets.adapter.rooms.get(roomId)))
        io.to(roomId).emit('players-in-room', socketArray.filter(s => s.room === roomId))
        // io.to(roomId).emit('count', io.sockets.adapter.rooms.get(roomId) ? io.sockets.adapter.rooms.get(roomId).size : 0)
        socket.on('new-message', ({ username, message }) => {
            io.in(roomId).emit('incoming-message', { username, message });
        })

        socket.on('username', username => {
             socketArray.find(s => s.id === socket.id).username =  username
            io.in(roomId).emit('players-in-room', socketArray.filter(s => s.room === roomId))
        })

        //handle ready function
        socket.on('ready', (socketId) => {
            console.log(socketId + " is ready!")
            io.to(roomId).emit('player-ready', socketId)
        })
    // *************************************************************************************
        // HANDLE USER ENTERS ROOM
        socket.on("disconnect", () => {

            const socketToRemove = socketArray.findIndex(s => s.id === socket.id)
            socketArray.splice(socketToRemove, 1)

            if (io.sockets.adapter.rooms.get(roomId)) {
                io.to(roomId).emit('players-in-room', socketArray.filter(s => s.room === roomId))
            }
            // io.to(roomId).emit('admin-message', `${socket.id} has left`)
        });
    })
});

module.exports = httpServer;