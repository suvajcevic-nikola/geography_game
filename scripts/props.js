let proposition = document.querySelector(".proposition");
let usernameFormProp = document.querySelector(".usernameFormProp")
let term = document.querySelector("#term");
let category = document.querySelector("#category");

let checkUsername = () => {
    if(localStorage.username){
        return localStorage.username;
    } else {
        return "anonymous";
    }
}

let checking = () => {
    if(checkUsername() == "anonymous"){
        return proposition.innerHTML = ``;
        // usernameFormProp.innerHTML = ``;
    };
}
checking();

function firstLetter(string)
{
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

proposition.addEventListener('submit', e => {
    e.preventDefault();
    let pattern = /^[a-žA-Ž\s]+$/gm;
    if (pattern.test(term.value)) {
        let date = new Date();
        db.collection("pojmovi").doc().set({
        pocetno_slovo: firstLetter(term.value.charAt(0)),
        kategorija: category.value,
        pojam: firstLetter(term.value),
        korisnik: localStorage.getItem("username"),
        vreme: firebase.firestore.Timestamp.fromDate(date)
    })
    } else alert("Neuspesno dodavanje predloga");
    proposition.reset();
});