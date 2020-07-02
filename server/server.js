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
        waitingPlayer.emit('message', '<b id="wait">Čekamo protivnika...</b>');
        // console.log('Waiting for player');
      }

      sock.on('disconnect', function(){
        io.emit('message', '<b id="playerDisconnect">Protivnik je napustio igru!</b>');
        io.emit('disc', 'disc');
      });

      sock.on('message', (text) => {
        io.emit('message', text);
      });
});


//server listen
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));