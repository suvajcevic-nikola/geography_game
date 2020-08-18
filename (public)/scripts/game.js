export class Game{

    constructor(user){
        this.username = user;
        this.terms = db.collection('pojmovi');
        this.results = db.collection('rezultati');
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

    checkUserAnswers(value, category, firstLetter, player){
        if(firstLetter == (this.firstLetter(value)).toUpperCase()) {
            this.checkTerm(value, category, data => {
            if(data) {
                localStorage.setItem(`${player}${category}`, false);
            } else {
                localStorage.setItem(`${player}${category}`, this.stringCheck(value));
            }
        });
        } else localStorage.setItem(`${player}${category}`, false);
    }

    computerAnswerCountry(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerDržava`, false);
            } else localStorage.setItem(`computerDržava`, string);
        } else localStorage.setItem(`computerDržava`, false);
    }

    computerAnswerCity(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerGrad`, false);
            } else localStorage.setItem(`computerGrad`, string);
        } else localStorage.setItem(`computerGrad`, false);
    }

    computerAnswerRiver(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerReka`, false);
            } else localStorage.setItem(`computerReka`, string);
        } else localStorage.setItem(`computerReka`, false);
    }

    computerAnswerMountain(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerPlanina`, false);
            } else localStorage.setItem(`computerPlanina`, string);
        } else localStorage.setItem(`computerPlanina`, false);
    }

    computerAnswerAnimal(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerŽivotinja`, false);
            } else localStorage.setItem(`computerŽivotinja`, string);
        } else localStorage.setItem(`computerŽivotinja`, false);
    }

    computerAnswerPlant(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerBiljka`, false);
            } else localStorage.setItem(`computerBiljka`, string);
        } else localStorage.setItem(`computerBiljka`, false);
    }

    computerAnswerItem(string, probability){
        if(probability == 1){
            if(string == undefined){
                localStorage.setItem(`computerPredmet`, false);
            } else localStorage.setItem(`computerPredmet`, string);
        } else localStorage.setItem(`computerPredmet`, false);
    }

    multiplayerUsernameWrite(value, element){
        let li = document.createElement('li');
        li.setAttribute('id', `${element}Name`);
        li.setAttribute('data-value', `${value}`);
        li.innerHTML = value;
        li.style.color = "rgb(248, 182, 0)";
        document.getElementById(element).appendChild(li);
    }

    resultCalculator(userAnswer, computerAnswer, ul0, ul1){
        if(userAnswer !='false' && computerAnswer !='false'){
            if (userAnswer == computerAnswer){
                let userLi = document.createElement('li');
                userLi.innerHTML = `${userAnswer} - 5 poena`;
                document.getElementById(ul0).appendChild(userLi);
                this.userPoints.push(5);

                let compLi = document.createElement('li');
                compLi.innerHTML = `${computerAnswer} - 5 poena`;
                document.getElementById(ul1).appendChild(compLi);
                this.computerPoints.push(5);
            } else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 10 poena`;
            document.getElementById(ul0).appendChild(userLi);
            this.userPoints.push(10);

            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 10 poena`;
            document.getElementById(ul1).appendChild(compLi);
            this.computerPoints.push(10);
            };
        } else if(userAnswer != 'false' && computerAnswer == 'false'){
            let userLi = document.createElement('li');
            userLi.innerHTML = `${userAnswer} - 15 poena`;
            document.getElementById(ul0).appendChild(userLi);
            this.userPoints.push(15);

            let compLi = document.createElement('li');
            compLi.innerHTML = `Netačan pojam - 0 poena`;
            document.getElementById(ul1).appendChild(compLi);
        }else if(userAnswer == 'false' && computerAnswer != 'false'){
            let compLi = document.createElement('li');
            compLi.innerHTML = `${computerAnswer} - 15 poena`;
            document.getElementById(ul1).appendChild(compLi);
            this.computerPoints.push(15);

            let userLi = document.createElement('li');
            userLi.innerHTML = `Netačan pojam - 0 poena`;
            document.getElementById(ul0).appendChild(userLi);
        }else {
            let userLi = document.createElement('li');
            userLi.innerHTML = `Netačan pojam - 0 poena`;
            document.getElementById(ul0).appendChild(userLi);

            let compLi = document.createElement('li');
            compLi.innerHTML = `Netačan pojam - 0 poena`;
            document.getElementById(ul1).appendChild(compLi);
        };
    }

    score(ul0, ul1){
        let userScore = this.userPoints.reduce((a, b) => a + b, 0);
        let userLi = document.createElement('li');
        userLi.innerHTML = `<b style="color: green;">Ukupno poena<li id="user0Res" value="${userScore}">${userScore}</li><b/>`;
        document.getElementById(ul0).appendChild(userLi);

        let computerScore = this.computerPoints.reduce((a, b) => a + b, 0);
        let compLi = document.createElement('li');
        compLi.innerHTML = `<b style="color: green;">Ukupno poena<li id="user1Res" value="${computerScore}">${computerScore}</li><b/>`;
        document.getElementById(ul1).appendChild(compLi);

        if(userScore > computerScore){
            let userLi = document.createElement('li');
            userLi.innerHTML = `<img src="./images/win.png" alt="winImg" id="winImg">`;
            document.getElementById(ul0).appendChild(userLi);
        }else if(userScore < computerScore){
            let compLi = document.createElement('li');
            compLi.innerHTML = `<img src="./images/win.png" alt="winImg" id="winImg">`;
            document.getElementById(ul1).appendChild(compLi);
        }else document.getElementById('noWin').innerHTML = `Rezultat je nerešen!`;
    }

    // userScoreExists(callback) {
    //     this.results
    //         .where("username", "==", localStorage.username)
    //         .get()
    //         .then( snapshot => {
    //             let doc;
    //             if(snapshot.docs.length) {
    //                 doc = snapshot.docs[0];
    //             } else {
    //                 doc = false;
    //             }
    //             callback(doc);
    //         });
    // }

    // addScore(score) {
    //     this.userScoreExists( doc => {
    //         let data = doc ? doc.data() : false;
    //         let docId = doc ? doc.id : null;
    //         let time = new Date();
    //         let newDoc = {
    //             username: localStorage.username,
    //             broj_igara: data ? data.broj_igara + 1 : 1,
    //             broj_poena: data ? data.broj_poena + score : score,
    //             datum: firebase.firestore.Timestamp.fromDate(time)
    //         };
    //         if(doc) {
    //             return this.results.doc(docId).update(newDoc);
    //         } else {
    //             return this.results.doc().set(newDoc);
    //         }
    //     });
    // }

}