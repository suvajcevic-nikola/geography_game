export class Game{

    constructor(user){
        this.username = user;
        this.terms = db.collection('pojmovi');
        this.userArr = [];
        this.computerArr = [];
        this.userAnswerArr =[];
    }

    set username(user){
        this._username = user;
    }

    get username(){
        return this._username;
    }

    updateUsername(upUsername){
        this.username = upUsername;
        localStorage.setItem("username", upUsername);
    }

    firstLetter(string){
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    checkTerm(term, category, callback) {
        let x = true;
        this.terms
                .where("pojam", "==", this.firstLetter(term))
                .where("kategorija", "==", category)
                .get()
                .then( snapshot => {
                    snapshot.docs.forEach( doc =>{
                        if(doc.data()){
                          x= false;
                        }
                    });
                    callback(x);
                  })
                  .catch( error => {
                    console.log(error);
                  });
    }

    userAnswers(term, category){

        let docProp = {
            pocetno_slovo: this.firstLetter(term.charAt(0)),
            kategorija: category,
            pojam: this.firstLetter(term),
            korisnik: this.username
        }
        console.log(docProp);
    }

    async addProp(term, category){

        let date = new Date();

        let docProp = {
            pocetno_slovo: this.firstLetter(term.charAt(0)),
            kategorija: category,
            pojam: this.firstLetter(term),
            korisnik: this.username,
            vreme: firebase.firestore.Timestamp.fromDate(date)
        }

        let response = await this.terms.add(docProp);
        return response;
    }

    getProps(callback){
        this.terms.get().then( snapshot => {
            snapshot.docs.forEach(doc => {
                this.userArr.push(doc.data().korisnik);
            });
            callback(this.userArr);
        });
    }

    render(y){
        let counts = {};
        y.forEach(x=>counts[x]=(counts[x] || 0)+1 );
        // console.log(counts)

        let sortable = [];
        for (var elem in counts) {
            sortable.push([elem, counts[elem]]);
        }

        let score = sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let top = document.querySelector(".top");
        top.innerHTML = `
        <h2 id="fameh2">Hall of Fame</h2><hr>
        <ul style="list-style-type:none;">
        <li>${score[0][0]} - ${score[0][1]}</li>
        <li>${score[1][0]} - ${score[1][1]}</li>
        <li>${score[2][0]} - ${score[2][1]}</li>
        <li>${score[3][0]} - ${score[3][1]}</li>
        <li>${score[4][0]} - ${score[4][1]}</li>
        </ul>
        `;
    }

    getRandomLetter(length) {
        let result           = '';
        let characters       = 'ABCDEFGHIJKLMNOPRSTUVZŠĐŽČĆ';
        let charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
           result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
     }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    probability() {
        let arr = [1, 1, 1, 1, 1, 1, 1, 1, 2, 2];
        var idx = Math.floor(Math.random() * arr.length);
        return arr[idx];
    }

    randomPick(letter, category, callback){
        this.terms.where("pocetno_slovo", "==", letter).where("kategorija", "==", category).get().then( snapshot => {
            snapshot.docs.forEach(doc => {
                this.computerArr.push(doc.data().pojam);
            });
            let min = 0;
            let max = this.computerArr.length-1;
            let index = this.getRandomInt(min, max);
            let computerAnswer = this.computerArr[index];
            callback(computerAnswer, this.probability());
            this.computerArr = [];
        });
    }

    computerAnswerCountry(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerDrzava`, false);
            } else localStorage.setItem(`computerDrzava`, string);
        } else localStorage.setItem(`computerDrzava`, false);
        // console.log(string, probability);

    }

    computerAnswerCity(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerGrad`, false);
            } else localStorage.setItem(`computerGrad`, string);
        } else localStorage.setItem(`computerGrad`, false);
        // console.log(string, probability);
    }

    computerAnswerRiver(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerReka`, false);
            } else localStorage.setItem(`computerReka`, string);
        } else localStorage.setItem(`computerReka`, false);
        // console.log(string, probability);
    }

    resultCalculator(userAnswer, computerAnswer){
        if(userAnswer !='false' && computerAnswer !='false'){
            if (userAnswer == computerAnswer){
                let userLi = document.createElement('li');
                userLi.innerHTML = `${userAnswer} - 5p`;
                document.getElementById('userResultUl').appendChild(userLi);

                let compLi = document.createElement('li');
                compLi.innerHTML = `${computerAnswer} - 5p`;
                document.getElementById('computerResultUl').appendChild(compLi);

            } else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 5p`;
            document.getElementById('userResultUl').appendChild(userLi);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 5p`;
            document.getElementById('computerResultUl').appendChild(compLi); };
        } else if(userAnswer != 'false' && computerAnswer == 'false'){
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 15p`;
            document.getElementById('userResultUl').appendChild(userLi);
        }else if(userAnswer == 'false' && computerAnswer != 'false'){
            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 15p`;
            document.getElementById('computerResultUl').appendChild(compLi);
        }else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 0p`;
            document.getElementById('userResultUl').appendChild(userLi);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 0p`;compLi
            document.getElementById('computerResultUl').appendChild(compLi);
        };
    }

}