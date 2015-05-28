import AuthStore from './stores/auth';
import MainStore from './stores/main';

export default class Stores {
    constructor() {
        this.auth = new AuthStore();
        this.main = new MainStore();
    }
};
