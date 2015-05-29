import fruitService from './services/fruit';
import tasteService from './services/taste';
import userService from './services/users';
import uploadService from './services/upload';

const services = {
    fruit: fruitService,
    taste: tasteService,
    users: userService,
    upload: uploadService
};

export default services;
