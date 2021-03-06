import { Game } from "./game.js";

let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");
let menu = document.querySelector(".menu");
let title = document.querySelector(".item2");
let playBtn = document.querySelector("#playBtn");
let multiplayBtn = document.querySelector("#multiplayBtn");
let playDiv = document.querySelector("#playDiv");
let intro = document.querySelector(".intro");
let play = document.querySelector(".item6");
let result = document.querySelector(".result");
let country = document.querySelector("#country");
let city = document.querySelector("#city");
let river = document.querySelector("#river");
let mountain = document.querySelector("#mountain");
let animal = document.querySelector("#animal");
let plant = document.querySelector("#plant");
let item = document.querySelector("#item");

let gameEnd = false;

let checkUsername = () => {
    if(localStorage.username){
        return localStorage.username;
    } else {
        return "anonymous";
    }
};

let user = new Game(checkUsername());
export {user};

window.onload = function() {
    if(checkUsername() != "anonymous"){
        document.getElementById('down').click();
    };
};

let check = () => {
    if(checkUsername() != "anonymous"){

        playDiv.style.display = "block";

        usernameForm.innerHTML = `<label for="username"></label>`;
        menu.style.display = "block";

        let down = document.createElement("div");
        down.setAttribute("id", "down");
        down.innerHTML = `<b id="userColor">Korisnik: </b><b id="usernameColor">${localStorage.username}</b><i class="material-icons arrow" id="click">expand_more</i>`;
        document.getElementById('current').appendChild(down);

        let userOptions = document.createElement("div");
        userOptions.setAttribute("id", "userOptions");
        document.getElementById('current').appendChild(userOptions);

        let ul = document.createElement('ul');
        ul.setAttribute("id", "ul");
        let li1 = document.createElement('li');
        li1.setAttribute("id", "li1");
        li1.innerHTML = `Odjavi se`;
        ul.appendChild(li1);
        document.getElementById('userOptions').appendChild(ul);

        let logout = document.getElementById('li1');

        logout.onclick = () => {
            localStorage.clear();
            location.reload();
        }

        down.onclick = () => {
            if(userOptions.style.display == "none"){
                userOptions.style.display = "block";
                down.style.color = "rgb(165, 165, 165)";
                down.innerHTML = `<b id="userColor">Korisnik: </b><b id="usernameColor">${localStorage.username}</b><i class="material-icons arrow" id="click">expand_less</i>`;
            } else {
                userOptions.style.display = "none";
                down.style.color = "white";
                down.innerHTML = `<b id="userColor">Korisnik: </b><b id="usernameColor">${localStorage.username}</b><i class="material-icons arrow" id="click">expand_more</i>`;
            }
        };
    };
}
check();

usernameForm.addEventListener ('submit', e => {
    if(usernameInput.value){
        e.preventDefault();
        user.updateUsername(usernameInput.value);
        usernameForm.reset();
        check();
        document.getElementById('down').click();
    } else alert("Unesite korisničko ime");
});

let startGameVsComp = () => {
    if(checkUsername() != "anonymous"){

        intro.classList.add('show');
        title.classList.add("hidden");
        title.classList.add("fix");

        let playGame = () => {
            play.classList.add('show');
            intro.classList.add("hidden");
            setTimeout(timer, 91000);
        };

        setTimeout(playGame, 2500);

        localStorage.setItem('firstLetter', user.getRandomLetter(1));

        let lett = document.createElement("h1");
        lett.setAttribute("id", "playH1");
        lett.innerHTML = `Slovo: ${localStorage.firstLetter}`;
        document.getElementById('lettAndTime').appendChild(lett);

        let timeleft = 91;
        let downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = `<b id="time">Vreme je isteklo!</b>`;
        } else {
            document.getElementById("countdown").innerHTML = timeleft;
        }
        timeleft -= 1;
        }, 1000);

        let introLett = document.createElement("h2");
        introLett.setAttribute("id", "introLett");
        introLett.innerHTML = `Slovo: ${localStorage.firstLetter}`;
        document.getElementById('intro').appendChild(introLett);

        document.getElementById("firstPlayer").innerHTML = `${localStorage.username}`;

    } else alert("Unesite korisničko ime");
}
playBtn.onclick = () => {
    startGameVsComp();
};

multiplayBtn.onclick = () =>{
    window.location.href = "../multiplayer.html";
};

document.querySelector('#confirm').onclick = () => {
    timer();
    gameEnd = true;
};

document.getElementById('newGameWithComp').onclick = () => {
    window.location.href = "../index.html";
}

let timer = () => {

    if(gameEnd == false){

    user.checkUserAnswers(country.value, country.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(city.value, city.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(river.value, river.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(mountain.value, mountain.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(animal.value, animal.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(plant.value, plant.name, localStorage.firstLetter, 'user');
    user.checkUserAnswers(item.value, item.name, localStorage.firstLetter, 'user');

    user.randomPick(localStorage.firstLetter, "Država", user.computerAnswerCountry);
    user.randomPick(localStorage.firstLetter, "Grad", user.computerAnswerCity);
    user.randomPick(localStorage.firstLetter, "Reka", user.computerAnswerRiver);
    user.randomPick(localStorage.firstLetter, "Planina", user.computerAnswerMountain);
    user.randomPick(localStorage.firstLetter, "Životinja", user.computerAnswerAnimal);
    user.randomPick(localStorage.firstLetter, "Biljka", user.computerAnswerPlant);
    user.randomPick(localStorage.firstLetter, "Predmet", user.computerAnswerItem);

    setTimeout(showResult, 1000);
    };
};


let showResult = () => {
    result.classList.add('show');
    play.classList.add("hidden");

    document.getElementById('userH3').innerHTML = `${localStorage.username}`;

    user.resultCalculator(localStorage.userDržava, localStorage.computerDržava, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userGrad, localStorage.computerGrad, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userReka, localStorage.computerReka, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userPlanina, localStorage.computerPlanina, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userŽivotinja, localStorage.computerŽivotinja, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userBiljka, localStorage.computerBiljka, 'userResultUl', 'computerResultUl');
    user.resultCalculator(localStorage.userPredmet, localStorage.computerPredmet, 'userResultUl', 'computerResultUl');

    user.score('userResultUl', 'computerResultUl');
};






