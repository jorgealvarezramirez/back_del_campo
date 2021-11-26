const {Router} = require('express');
const UserController = require('../controllers/userController');

class UserRouter{
    constructor(){
        //Crear objeto de tipo Router y asignarlo como atributo de la clase
        this.router = Router();
        //Configurar las rutas
        this.config();
    }

    config(){
        const objUserC = new UserController();
        //Crear y configurar endpoints
        this.router.post('/user', objUserC.register);
        this.router.post('/user/auth', objUserC.login);
    }
}

module.exports = UserRouter;