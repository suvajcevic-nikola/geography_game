import { Game } from "./game.js";
import {user} from "./app.js"

let proposition = document.querySelector(".proposition");
let propform = document.querySelector(".item4");
let term = document.querySelector("#term");
let category = document.querySelector("#category"); // for addProp in game.js
let propBtn = document.querySelector(".propBtn");
let title = document.querySelector(".item2");
let top = document.querySelector(".top");

propBtn.onclick = function() {
    propform.classList.add('show');
    title.classList.add("hidden");
};

proposition.addEventListener('submit', e => {
    e.preventDefault();
    let pattern = /^[a-žA-Ž\s]+$/gm;
    if (pattern.test(term.value)) {
        // user.checkTerm(term, category, data => {
        //     if(data) {
        //         user.addProp(term);
        //     }
        //     else alert("Pojam vec postoji u bazi");
        // });
        user.addProp(term);
    } else alert("Neuspesno dodavanje predloga");
    proposition.reset();
});

// db.collection('pojmovi').get().then( (snapshot) => {
//     snapshot.docs.forEach(doc => {
//         console.log(doc.data().korisnik);
//     })
// });

user.getProps(user.render);



