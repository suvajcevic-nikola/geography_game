import { Game } from "./game.js";

let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");
let menu = document.querySelector(".menu");
let hallFame = document.querySelector(".item5");
let fameBtn = document.querySelector(".fameBtn");
let title = document.querySelector(".item2");
let playBtn = document.querySelector("#playBtn");
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

let checkUsername = () => {
    if(localStorage.username){
        return localStorage.username;
    } else {
        return "anonymous";
    }
};

let user = new Game(checkUsername());
export {user};

let check = () => {
    if(checkUsername() != "anonymous"){
        usernameForm.innerHTML = `<label for="username"></label>`;
        menu.style.display = "block";

        let down = document.createElement("div");
        down.setAttribute("id", "down");
        down.innerHTML = `<b id="userColor">Korisnik: </b><b id="usernameColor">${localStorage.username}</b><i class="material-icons arrow" id="click">details</i>`;
        document.getElementById('current').appendChild(down);

        let userOptions = document.createElement("div");
        userOptions.setAttribute("id", "userOptions");
        document.getElementById('current').appendChild(userOptions);

        let ul = document.createElement('ul');
        ul.setAttribute("id", "ul");
        let li1 = document.createElement('li');
        li1.setAttribute("id", "li1");
        li1.innerHTML = `Promeni nadimak`;
        ul.appendChild(li1);
        document.getElementById('userOptions').appendChild(ul);

        down.onclick = () => {
            if(userOptions.style.display == "none"){
                userOptions.style.display = "block";
                down.style.color = "rgb(165, 165, 165)";
            } else {
                userOptions.style.display = "none";
                down.style.color = "white";
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
    } else alert("Unesite korisnicko ime");
});

fameBtn.onclick = () => {
    hallFame.classList.add('show');
    title.classList.add("hidden");
};

playBtn.onclick = () => {
    if(checkUsername() != "anonymous"){
        intro.classList.add('show');
        title.classList.add("hidden");

        let playGame = () => {
            play.classList.add('show');
            intro.classList.add("hidden");
            setTimeout(timer, 10000);
        };

        setTimeout(playGame, 2500);

        localStorage.setItem('firstLetter', user.getRandomLetter(1));

        let lett = document.createElement("h1");
        lett.setAttribute("id", "playH1")
        lett.innerHTML = `Slovo: ${localStorage.firstLetter}`;
        document.getElementById('lettAndTime').appendChild(lett);

        let timeleft = 10;
        let downloadTimer = setInterval(function(){
        if(timeleft <= 0){
            clearInterval(downloadTimer);
            document.getElementById("countdown").innerHTML = "Vreme je isteklo!";
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

    } else alert("Unesite korisnicko ime");
};

// let checkUserAnswers = (value, category, firstLetter, player) => {
//     if(firstLetter == (user.firstLetter(value)).toUpperCase()) {
//         user.checkTerm(value, category, data => {
//         if(data) {
//             localStorage.setItem(`${player}${category}`, false);
//         } else {
//             localStorage.setItem(`${player}${category}`, user.stringCheck(value));
//         }
//     });
//     } else localStorage.setItem(`${player}${category}`, false);
// }
// export {checkUserAnswers};

let timer = () => {
    console.log(localStorage.firstLetter);

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

    setTimeout(showResult, 2500);

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






