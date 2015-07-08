function developmentAppEnv() {
    this.WEB_SOCKET_URL = 'http://localhost:3000'
}

const instance = new developmentAppEnv();
export default instance;
