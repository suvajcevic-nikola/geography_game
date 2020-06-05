const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io');

const multiplayer = require('./multiplayer');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

//port
const PORT = process.env.PORT || 8080;
//static
app.use(express.static(path.join(__dirname, '../(public)')));

let waitingPlayer = null;

io.on('connection', (sock) => {
    if (waitingPlayer) {
        new multiplayer(waitingPlayer, sock);
        waitingPlayer = null;
      } else {
        waitingPlayer = sock;
        waitingPlayer.emit('message', 'Waiting for an opponent');
        // console.log('Waiting for player');
      }

      sock.on('message', (text) => {
        io.emit('message', text);
      });
});



//server listen
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));