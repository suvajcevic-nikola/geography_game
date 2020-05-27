export class Game{

    constructor(user){
        this.username = user;
        this.terms = db.collection('pojmovi');
        this.userArr = [];
        this.computerArr = [];
        this.userAnswerArr =[];
        this.userPoints = [];
        this.computerPoints = [];
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

    // firstLetter(string){
    //     return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    // }

    firstLetter(string) {
        let str;
        if(string.slice(0, 2) == 'Nj' ||
            string.slice(0, 2) == 'Dž' ||
            string.slice(0, 2) == 'Lj') {
            str = string.slice(0, 2);
        } else {
            str = string.slice(0, 1);
        }
        return str;
    }

    stringCheck(string) {
        let newStr = string
        //delete spaces and tabs
            .replace(/\s+/g, '')
            //delete all special characters and numbers
            .replace(/[^a-zđščžć]+/gi, '')
            //only first letter uppercase
            .replace(/(\B)[^ ]*/g, match => (match.toLowerCase()))
            .replace(/^[^ ]/g, match => (match.toUpperCase()));
        return newStr;
    }

    checkTerm(term, category, callback) {
        let x = true;
        this.terms
                .where("pojam", "==", this.stringCheck(term))
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

    async addProp(term, category){

        let date = new Date();

        let docProp = {
            pocetnoSlovo: this.firstLetter(term),
            kategorija: category,
            pojam: this.stringCheck(term),
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
        this.terms.where("pocetnoSlovo", "==", letter).where("kategorija", "==", category).get().then( snapshot => {
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
                localStorage.setItem(`computerDržava`, false);
            } else localStorage.setItem(`computerDržava`, string);
        } else localStorage.setItem(`computerDržava`, false);
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

    computerAnswerMountain(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerPlanina`, false);
            } else localStorage.setItem(`computerPlanina`, string);
        } else localStorage.setItem(`computerPlanina`, false);
        // console.log(string, probability);
    }

    computerAnswerAnimal(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerŽivotinja`, false);
            } else localStorage.setItem(`computerŽivotinja`, string);
        } else localStorage.setItem(`computerŽivotinja`, false);
        // console.log(string, probability);
    }

    computerAnswerPlant(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerBiljka`, false);
            } else localStorage.setItem(`computerBiljka`, string);
        } else localStorage.setItem(`computerBiljka`, false);
        // console.log(string, probability);
    }

    computerAnswerItem(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerPredmet`, false);
            } else localStorage.setItem(`computerPredmet`, string);
        } else localStorage.setItem(`computerPredmet`, false);
        // console.log(string, probability);
    }

    resultCalculator(userAnswer, computerAnswer){
        if(userAnswer !='false' && computerAnswer !='false'){
            if (userAnswer == computerAnswer){
                let userLi = document.createElement('li');
                userLi.innerHTML = `${userAnswer} - 5 poena`;
                document.getElementById('userResultUl').appendChild(userLi);
                this.userPoints.push(5);

                let compLi = document.createElement('li');
                compLi.innerHTML = `${computerAnswer} - 5 poena`;
                document.getElementById('computerResultUl').appendChild(compLi);
                this.computerPoints.push(5);
            } else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 10 poena`;
            document.getElementById('userResultUl').appendChild(userLi);
            this.userPoints.push(10);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 10 poena`;
            document.getElementById('computerResultUl').appendChild(compLi);
            this.computerPoints.push(10);
            };
        } else if(userAnswer != 'false' && computerAnswer == 'false'){
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 15 poena`;
            document.getElementById('userResultUl').appendChild(userLi);
            this.userPoints.push(15);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 0 poena`;
            document.getElementById('computerResultUl').appendChild(compLi);
        }else if(userAnswer == 'false' && computerAnswer != 'false'){
            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 15 poena`;
            document.getElementById('computerResultUl').appendChild(compLi);
            this.computerPoints.push(15);

            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 0 poena`;
            document.getElementById('userResultUl').appendChild(userLi);
        }else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 0 poena`;
            document.getElementById('userResultUl').appendChild(userLi);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 0 poena`;
            document.getElementById('computerResultUl').appendChild(compLi);
        };
    }

    score(){
        let userScore = this.userPoints.reduce((a, b) => a + b, 0);
        let userLi = document.createElement('li');
        userLi.innerHTML = `<b style="color: green;">Ukupno poena: ${userScore}<b/>`;
        document.getElementById('userResultUl').appendChild(userLi);

        let computerScore = this.computerPoints.reduce((a, b) => a + b, 0);
        let compLi = document.createElement('li');
        compLi.innerHTML = `<b style="color: green;">Ukupno poena: ${computerScore}<b/>`;
        document.getElementById('computerResultUl').appendChild(compLi);

        if(userScore > computerScore){
            let userLi = document.createElement('li');
            userLi.innerHTML = `<img src="./images/win.png" alt="winImg" id="winImg">`;
            document.getElementById('userResultUl').appendChild(userLi);
        }else if(userScore < computerScore){
            let compLi = document.createElement('li');
            compLi.innerHTML = `<img src="./images/win.png" alt="winImg" id="winImg">`;
            document.getElementById('computerResultUl').appendChild(compLi);
        }else document.getElementById('noWin').innerHTML = `Rezultat je nerešen!`;
    }

}