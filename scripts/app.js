import { Game } from "./game.js";

let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");
let menu = document.querySelector(".menu");

let checkUsername = () => {
    if(localStorage.username){
        return localStorage.username;
    } else {
        return "anonymous";
    }
}

let user = new Game(checkUsername());
console.log(user);

let check = () => {
    if(checkUsername() != "anonymous"){
        return usernameForm.innerHTML = ``,
        menu.innerHTML = `
        <a href="/predlog_pojmova.html">Predlog pojmova</a>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
        `;
    }
}
check();

usernameForm.addEventListener ('submit', e => {
    if(usernameInput.value){
        e.preventDefault();
        user.updateUsername(usernameInput.value);
        usernameForm.reset();
        check();
        menu.innerHTML = `
        <a href="/predlog_pojmova.html">Predlog pojmova</a>
        <a href="#">Link 1</a>
        <a href="#">Link 2</a>
        <a href="#">Link 3</a>
        <a href="#">Link 4</a>
        `;
    } else alert("Unesite korisnicko ime");
});
