export class Game{

    constructor(user){
        this.username = user;
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
}