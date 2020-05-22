let hallFame = document.querySelector(".item5");
let fameBtn = document.querySelector(".fameBtn");
let title = document.querySelector(".item2");
let propform = document.querySelector(".item4");

fameBtn.onclick = function() {
    hallFame.classList.add('show');
    title.classList.add("hidden");
};