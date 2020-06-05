
import { Game } from "./game.js";

let user = new Game('user');

const writeEvent = (text) => {

    let el = document.createElement('li');
    el.innerHTML = text;

    document.getElementById("ullist").appendChild(el);
};

const log = (value) =>{
    let category = ['Država', 'Grad', 'Reka', 'Planina', 'Životinja', 'Biljka', 'Predmet'];
    value.forEach((array, j) => {
        console.log(`player ${j}`);
        for (let i = 0; i < array.length; i++) {
            console.log(array[i], category[i]);
            user.checkUserAnswers(array[i], category[i], localStorage.firstLetterMultiplayer, `player${j}`);
        }
    });
    setTimeout(showResult, 2500);
}

const showResult = () =>{

    let player0Storage = [localStorage.player0Država, localStorage.player0Grad, localStorage.player0Reka, localStorage.player0Planina,
        localStorage.player0Životinja, localStorage.player0Biljka, localStorage.player0Predmet];
    let player1Storage = [localStorage.player1Država, localStorage.player1Grad, localStorage.player1Reka, localStorage.player1Planina,
            localStorage.player1Životinja, localStorage.player1Biljka, localStorage.player1Predmet];

    player0Storage.forEach((element, i) => {
        user.resultCalculator(element, player1Storage[i], "player0Result", "player1Result");
    });
    // user.resultCalculator(localStorage.userDržava, localStorage.computerDržava);
    // user.resultCalculator(localStorage.userGrad, localStorage.computerGrad);
    // user.resultCalculator(localStorage.userReka, localStorage.computerReka);
    // user.resultCalculator(localStorage.userPlanina, localStorage.computerPlanina);
    // user.resultCalculator(localStorage.userŽivotinja, localStorage.computerŽivotinja);
    // user.resultCalculator(localStorage.userBiljka, localStorage.computerBiljka);
    // user.resultCalculator(localStorage.userPredmet, localStorage.computerPredmet);

    user.score("player0Result", "player1Result");

}

const firstLetter = (value) =>{
    console.log(value);
    writeEvent(`Pocetno slovo: ${value}`);
    localStorage.firstLetterMultiplayer = value;
}

const form = () => {
    let el = document.createElement('li');
    el.innerHTML = `<h2>Zanimljiva geografija</h2>`;
    document.getElementById("ullist").appendChild(el);

    document.getElementById("multiGameForm").style.display = "block";
};

// const submitFrom = (value) => {

//     let el = document.createElement('li');
//     el.innerHTML = value;

//     document.getElementById("result").appendChild(el);
// }

const onFormSubmitted = (e) => {
    e.preventDefault();

    let answers = [];

    ['drzava', 'grad', 'reka', 'planina', 'zivotinja', 'biljka', 'predmet'].forEach((id) => {
        const input = document.getElementById(id);
        const text = answers.push(input.value);
        input.value = '';
    });

    sock.emit('input', answers);
}

const sock = io();
sock.on('message', writeEvent);
sock.on('form', form);
// sock.on('input', submitFrom);
sock.on('submitedInputs', log);
sock.on('letter', firstLetter);

document.querySelector('#multiGameForm').addEventListener('submit', onFormSubmitted);