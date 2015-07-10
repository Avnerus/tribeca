// Fetch Util
import fetch_ from 'isomorphic-fetch';

export default class FetchUtil {
    constructor(cookieHeader) {
        this.fetch = fetch_.bind(undefined); // this solves an invocation error problem in chrome, according to https://github.com/matthew-andrews/isomorphic-fetch/pull/20
        this.cookieHeader = cookieHeader;
    }

    handleResponse(response) {
        return new Promise((resolve, reject) => {
            let responseOk = response.ok;
            response.json().
                then(function(responseJSON){
                    if (responseOk) {
                        resolve(responseJSON);
                    }  else {
                        reject(responseJSON);
                    }
            });
        });
    }

    addCredentials(opts) {
        if (this.cookieHeader) {
            opts.headers['Cookie'] = this.cookieHeader;
        } else {
            opts.credentials = 'include';
        }
        return opts;
    }

    postJSON(target, data) {
        let opts = {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
        opts = this.addCredentials(opts);

        return this.fetch(target,opts)
        .then((response) => {
            return this.handleResponse(response);
        });
    }

    getJSON(target) {
        let opts = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        };
        opts = this.addCredentials(opts);

        return this.fetch(target, opts)
        .then((response) => {
            return this.handleResponse(response);
        });
    }

    deleteJSON(target) {
        let opts = {
            method: 'DELETE',
            credentials: 'include',
            headers: {
                'Accept': 'application/json'
            }
        };
        opts = this.addCredentials(opts);

        return this.fetch(target,opts)
        .then((response) => {
            return this.handleResponse(response);
        });
    }

    putJSON(target, data){

        let opts =  {
            method: 'PUT',
            credentials: 'include',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        };
        opts = this.addCredentials(opts);

        return this.fetch(target,opts)
        .then((response) => {
            return this.handleResponse(response);
        });
    }
}
