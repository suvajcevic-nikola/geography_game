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
let username1;

io.on('connection', (sock) => {
    if(waitingPlayer) {
        sock.on('username', username2 => {
            if(username1 === username2 || username1 === undefined) {
                username1 = username2;
                waitingPlayer = sock;
                waitingPlayer.emit('message', '<b id="wait">Čekamo protivnika...</b>');
                sock.on('disconnect', () => {
                    username1 = undefined;
                });
            } else {
                new multiplayer(waitingPlayer, sock);
                waitingPlayer = null;
                username1 = undefined;
            }
        })
    } else {
        waitingPlayer = sock;
        waitingPlayer.on('username', username => {
            username1 = username;
        });
        waitingPlayer.emit('message', '<b id="wait">Čekamo protivnika...</b>');
    }

    sock.on('message', (text) => {
      io.emit('message', text);
    });
});


//server listen
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));