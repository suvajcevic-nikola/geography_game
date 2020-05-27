import {user} from "./app.js"

let proposition = document.querySelector(".proposition");
let propform = document.querySelector(".item4");
let term = document.querySelector("#term");
let category = document.querySelector("#category"); // for addProp in game.js
let propBtn = document.querySelector(".propBtn");
let title = document.querySelector(".item2");

propBtn.onclick = () => {
    propform.classList.add('show');
    title.classList.add("hidden");
};

proposition.addEventListener('submit', e => {
    e.preventDefault();
    let pattern = /^[a-žA-Ž\s]+$/gm;
    if (pattern.test(term.value)) {
        user.checkTerm(term.value, category.value, data => {
            if(data) {
                user.addProp(term.value, category.value).then( () => {
                    proposition.reset();
                });
            }
            else alert("Pojam vec postoji u bazi");
        });
    } else alert("Neuspesno dodavanje predloga");
});

user.getProps(user.render);
