import { makeAutoObservable } from 'mobx';

class AuthStore {
    key: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setKey(key: string) {
        this.key =  key;
    }
}

const authStore = new AuthStore();

export default authStore;
