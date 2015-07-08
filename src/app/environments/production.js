function productionAppEnv() {
    this.WEB_SOCKET_URL = 'http://www.bff2.com'
}

const instance = new productionAppEnv();
export default instance;
