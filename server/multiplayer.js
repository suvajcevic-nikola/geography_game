
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
    }

    _sendToPlayer(playerIndex, msg) {
        this._players[playerIndex].emit('message', msg);
    }

    _sendToPlayers(msg) {
        this._players.forEach((player) => {
          player.emit('message', msg);
          // console.log('Game starts');
        });
    }

    _displayForm(){
      this._players.forEach((player) => {
        player.emit('form');
      });
    }

    _onInput(playerIndex, input){
      this._inputs[playerIndex] = input;
      // this._sendToPlayer(playerIndex, `Vaši odgovori ${input}`);

      this._gameOver();
    }

    _checkInputs(inputs) {
      this._players.forEach((player) => {
        player.emit('submitedInputs', inputs);
        // console.log('Game starts');
      });
  }

    _gameOver(){
      const inputs = this._inputs;

      if(inputs[0] && inputs[1]){
        //  this._sendToPlayers('Game over' + ' ' + inputs.join(' : '));
        //  console.log(this._inputs);
         this._checkInputs(this._inputs);
         this._inputs = [null, null];
      };
    }

    _getRandomLetter(){
      let result           = '';
      let characters       = 'ABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ';
      // let characters       = 'B';
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