import { Game } from "./game.js";

let usernameForm = document.querySelector("#usernameForm");
let usernameInput = document.querySelector("#usernameInput");
let menu = document.querySelector(".menu");
let homeBtn = document.querySelector(".homeBtn");

let checkUsername = () => {
    if(localStorage.username){
        return localStorage.username;
    } else {
        return "anonymous";
    }
}

let user = new Game(checkUsername());
export {user};

let check = () => {
    if(checkUsername() != "anonymous"){
        usernameForm.innerHTML = `<label for="username">Korisnik: ${localStorage.username}</label>`
        menu.style.display = "block";
    }
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

homeBtn.onclick = function() {
    location.reload();
};
