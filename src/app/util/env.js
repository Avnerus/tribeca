// Environment util
import appEnvironment from '../environment'
import miscUtil from './misc'

import _ from 'underscore'

class EnvUtil {
    constructor() {
        let serverEnvironment = {};
        if (!miscUtil.isBrowser()) {
             serverEnvironment = require('../../server/environment');
        }

        // Combine all of the environments
        this.config = {};
        this.config = _.extend(appEnvironment, serverEnvironment);

        if (!miscUtil.isBrowser()) {
            // Load any environment variables from the shell
            Object.keys(this.config).forEach((key) => {
                if (process.env[key]) {
                    this.config[key] = process.env[key];
                } else {
                    process.env[key] = this.config[key];
                }
            });
        }
    }

    get(key) {
        return this.config[key];
    }

    getArray(key) {
        if (this.config[key]) {
            return this.config[key].split(/\s+/);
        } else {
            return null;
        }
    }
};

// Singleton
let instance = new EnvUtil();
export default instance;

