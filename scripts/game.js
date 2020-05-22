export class Game{

    constructor(user){
        this.username = user;
        this.terms = db.collection('pojmovi');
        this.userArr = [];
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

    // checkTerm(term, category, callback) {
    //     let x = true;
    //     this.terms
    //             .where("pojam", "==", term)
    //             .where("kategorija", "==", category)
    //             .get()
    //             .then( snapshot => {
    //                 snapshot.docs.forEach( doc =>{
    //                     if(doc.data()){
    //                       x= false;
    //                     }
    //                 });
    //                 callback(x);
    //               })
    //               .catch( error => {
    //                 console.log(error);
    //               });
    // }

    async addProp(term){

        let date = new Date();

        let docProp = {
            pocetno_slovo: this.firstLetter(term.value.charAt(0)),
            kategorija: category.value,
            pojam: this.firstLetter(term.value),
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
        console.log(counts)

        let sortable = [];
        for (var elem in counts) {
            sortable.push([elem, counts[elem]]);
        }

        let score = sortable.sort(function(a, b) {
            return b[1] - a[1];
        });

        let top = document.querySelector(".top");
        top.innerHTML = `
        <ul>
        <li>${score[0]}</li>
        <li>${score[1]}</li>
        <li>${score[2]}</li>
        <li>${score[3]}</li>
        <li>${score[4]}</li>
        </ul>
        `;
    }
}