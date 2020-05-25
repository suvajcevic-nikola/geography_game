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
    intro.classList.add('show');
    title.classList.add("hidden");

    let playGame = () => {
        play.classList.add('show');
        intro.classList.add("hidden");
        setTimeout(timer, 5000);
    };

    setTimeout(playGame, 2500);

    localStorage.setItem('firstLetter', user.getRandomLetter(1));

    let lett = document.createElement("h1");
    lett.setAttribute("id", "playH1")
    lett.innerHTML = `Slovo: ${localStorage.firstLetter}`;
    document.getElementById('lettAndTime').appendChild(lett);

    let timeleft = 7;
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
};

let checkUserAnswers = (value, category, firstLetter) => {
    if(firstLetter == (user.firstLetter(value.charAt(0))).toUpperCase()) {
        user.checkTerm(value, category, data => {
        if(data) {
            localStorage.setItem(`user${category}`, false);
        } else {
            localStorage.setItem(`user${category}`, user.firstLetter(value));
        }
    });
    } else localStorage.setItem(`user${category}`, false);
}

let timer = () => {
    console.log(localStorage.firstLetter);
    checkUserAnswers(country.value, country.name, localStorage.firstLetter);
    checkUserAnswers(city.value, city.name, localStorage.firstLetter);
    checkUserAnswers(river.value, river.name, localStorage.firstLetter);
    user.randomPick(localStorage.firstLetter, "Drzava", user.computerAnswerCountry);
    user.randomPick(localStorage.firstLetter, "Grad", user.computerAnswerCity);
    user.randomPick(localStorage.firstLetter, "Reka", user.computerAnswerRiver);

    setTimeout(showResult, 2500);

};


let showResult = () => {
    result.classList.add('show');
    play.classList.add("hidden");

    document.getElementById('userH3').innerHTML = `${localStorage.username}`;

    // let userResDiv = document.createElement('div');
    // userResDiv.setAttribute("class", "col-4");
    // userResDiv.setAttribute("id", "userRes");
    // userResDiv.innerHTML = `
    // <h3>${localStorage.username}</h3><hr>
    // `;
    // let ulU = document.createElement('ul');
    // ulU.setAttribute("id", "userResultUl");
    // ulU.setAttribute("class", "col-4");
    // userResDiv.appendChild(ulU);
    // document.getElementById('result').appendChild(userResDiv);

    // let vsDiv = document.createElement('div');
    // vsDiv.setAttribute("class", "col-4");
    // vsDiv.setAttribute("id", "vsDiv");
    // vsDiv.innerHTML = `
    // <h3>VS</h3><hr>
    // <ul>
    //     <li>Drzava</li>
    //     <li>Grad</li>
    //     <li>Reka</li>
    // </ul>
    // `;
    // document.getElementById('result').appendChild(vsDiv);

    // let compResDiv = document.createElement('div');
    // compResDiv.setAttribute("class", "col-4");
    // compResDiv.setAttribute("id", "compRes");
    // compResDiv.innerHTML = `
    // <h3>Kompjuter</h3><hr>
    // `;
    // let ulC = document.createElement('ul');
    // ulC.setAttribute("id", "computerrResultUl");
    // ulC.setAttribute("class", "col-4");
    // compResDiv.appendChild(ulC);
    // document.getElementById('result').appendChild(compResDiv);

    user.resultCalculator(localStorage.userDrzava, localStorage.computerDrzava);
    user.resultCalculator(localStorage.userGrad, localStorage.computerGrad);
    user.resultCalculator(localStorage.userReka, localStorage.computerReka);
};






