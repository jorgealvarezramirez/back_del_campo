const express = require('express');
const cors = require('cors');
//Configurar variables de entorno
require('dotenv').config();
//Importar módulos
const ConnDb = require('./database/connDb');
const ProductRouter = require('./routers/productRouter');
const UserRouter = require('./routers/userRouter');


class Server {
    constructor() {
        this.objConn = new ConnDb();
        //Crear aplicación express
        this.app = express();
        this.config();
    }

    config() {
        //indicar el procesamiento de datos en formato json durante las peticiones
        this.app.use(express.json());
        //Permitir las conexiones de origen cruzado
        this.app.use(cors());
        //Almacenar el puerto por el que correrà el servidor
        this.app.set("PORT", process.env.PORT || 3000);
        //----------------Crear rutas-----------------
        const router = express.Router();
        //Procesar solicitudes con el mètodo GET a la raíz del servidor
        router.get("/", (req, res) => {
            res.status(200).send();
        });
        const userR = new UserRouter();
        const productR = new ProductRouter();

        //--------------Añadir rutas a express--------------
        this.app.use(router);
        this.app.use(userR.router);
        this.app.use(productR.router);

        //Poner el servidor a la escucha
        this.app.listen(this.app.get('PORT'), () => {
            console.log("Servidor corriendo por el puerto ==>> ", this.app.get('PORT'));
        });
    }
}

new Server();