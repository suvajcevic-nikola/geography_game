const writeEvent = (text) => {

    let el = document.createElement('li');
    el.innerHTML = text;

    document.getElementById("ullist").appendChild(el);
};

const log = (text) =>{
    let el = document.createElement('li');
    el.innerHTML = text[0][0];

    document.getElementById("ullist").appendChild(el);
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

document.querySelector('#multiGameForm').addEventListener('submit', onFormSubmitted);