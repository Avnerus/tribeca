import userService from './services/users';
import uploadService from './services/upload';
import mailService from './services/mail';

const services = {
    users: userService,
    email: mailService,
    upload: uploadService,
    mail: mailService
};

export default services;
