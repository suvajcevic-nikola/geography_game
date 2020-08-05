
import { Game } from "./game.js";

let user = new Game('user');

let newGameBtn = document.getElementById('newGameBtn');

const writeEvent = (text) => {

    let el = document.createElement('li');
    el.innerHTML = text;

    document.getElementById("ullist").appendChild(el);
};

const log = (value) => {
    let category = ['username', 'Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
    value.forEach((array, j) => {
        user.multiplayerUsernameWrite(`${value[j][0]}`, `player${j}Result`);

        for (let i = 1; i < array.length; i++) {
            console.log(array[i], category[i]);
            user.checkUserAnswers(array[i], category[i], localStorage.firstLetterMultiplayer, `player${j}`);
        }
    });
    setTimeout(showResult, 1500);
}

const showResult = () =>{
    let player0Storage = [localStorage.player0Država, localStorage.player0Grad, localStorage.player0Reka, localStorage.player0Planina,
        localStorage.player0Životinja, localStorage.player0Biljka, localStorage.player0Predmet];
    let player1Storage = [localStorage.player1Država, localStorage.player1Grad, localStorage.player1Reka, localStorage.player1Planina,
            localStorage.player1Životinja, localStorage.player1Biljka, localStorage.player1Predmet];

    player0Storage.forEach((element, i) => {
        user.resultCalculator(element, player1Storage[i], "player0Result", "player1Result");
    });

    user.score("player0Result", "player1Result");
    document.getElementById("result").style.display = "block";
    document.getElementById("multiGameForm").style.display = "none";
    document.getElementById("countdown").style.display = "none";

    let player0Res = document.getElementById("user0Res").value;
    let player0Name = document.getElementById("player0ResultName").getAttribute("data-value");;

    let player1Res = document.getElementById("user1Res").value;

    if(localStorage.username == player0Name){
        user.addScore(player0Res);
    } else user.addScore(player1Res);

    document.getElementById("multiFirstLett").style.display = "none";
}

const firstLetter = (value) =>{
    console.log(value);
    writeEvent(`<b id="multiFirstLett">Početno slovo: ${value}</b>`);
    localStorage.firstLetterMultiplayer = value;
}

const form = () => {
    document.getElementById("multiGameForm").style.display = "block";

    let timeleft = 90;
    let downloadTimer = setInterval(function(){
    if(timeleft <= 0){
        clearInterval(downloadTimer);
        document.getElementById("countdown").innerHTML = "Vreme je isteklo!";
    } else {
        document.getElementById("countdown").innerHTML = timeleft;
    }
    timeleft -= 1;
    }, 1000);

    setTimeout(submitFrom, 91000);
};

const submitFrom = () => {
    if(document.getElementById("multiGameForm").style.display == "block"){
        let answers = [];

        answers.push(localStorage.username);

        ['drzava', 'grad', 'reka', 'planina', 'zivotinja', 'biljka', 'predmet'].forEach((id) => {
            const input = document.getElementById(id);
            const text = answers.push(input.value);
            input.value = '';
        });

        sock.emit('input', answers);
    }
}

const onFormSubmitted = (e) => {
    e.preventDefault();
    submitFrom();
}

newGameBtn.onclick = () => {
    location.reload();
}

const disc = (value) =>{
    console.log(value);
    if(document.getElementById('wait') != null){
        document.getElementById('wait').style.display = 'none';
    };
    if(document.getElementById('gameStarts') != null){
        document.getElementById('gameStarts').style.display = 'none';
    };
    document.getElementById("countdown").style.display = 'none';
    document.getElementById("multiFirstLett").style.display = 'none';
    window.scrollTo(0, 0);

    document.getElementById("playerDisconnect").innerHTML+= '<br><b id="discNewGame">Pokreni novu igru</b>';

    document.getElementById("discNewGame").onclick = () => {
        location.reload();
    };
}

const sock = io();
sock.on('message', writeEvent);
sock.on('form', form);
sock.on('submitedInputs', log);
sock.on('letter', firstLetter);
sock.on('disc', disc);

sock.emit('username', localStorage.username);

document.querySelector('#multiGameForm').addEventListener('submit', onFormSubmitted);