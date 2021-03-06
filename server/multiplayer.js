
class Multiplayer {
    constructor(p1, p2) {
    this._players = [p1, p2];
    this._inputs = [null, null];

    this._sendToPlayers('<b id="gameStarts">Igra je počela!</b>');
    this._displayForm();
    this._getRandomLetter();

    this._players.forEach((player, idx) => {
      player.on('input', (input) => {
        this._onInput(idx, input);
      });
    });

    this._players.forEach(socket => {
      socket.on('disconnect', () => {
          this._players.forEach(sock => {
              if (socket !== sock) {
                  sock.emit('message', '<b id="playerDisconnect">Protivnik je napustio igru!</b>');
                  sock.emit('disc', 'disc');
              }
          });
      });
    });
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
          player.emit('message', msg);
        });
    }

    _displayForm(){
      this._players.forEach((player) => {
        player.emit('form');
      });
    }

    _onInput(playerIndex, input){
      this._inputs[playerIndex] = input;
      this._gameOver();
    }

    _checkInputs(inputs) {
      this._players.forEach((player) => {
        player.emit('submitedInputs', inputs);
      });
  }

    _gameOver(){
      const inputs = this._inputs;

      if(inputs[0] && inputs[1]){
         this._checkInputs(this._inputs);
         this._inputs = [null, null];
         this._players.forEach((player) => {
          player.disconnect();
        });
      };
    }

    _getRandomLetter(){
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ';
      // let characters    = 'B';
      let charactersLength = characters.length;
      for ( let i = 0; i < 1; i++ ) {
         result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      this._players.forEach((player) => {
        player.emit('letter', result);
      });
   }
}

module.exports = Multiplayer;