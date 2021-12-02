const { Router } = require('express');
const ProductController = require('../controllers/productController');
const TokenController = require('../controllers/tokenController');

class ProductRouter {

    constructor() {
        this.router = Router();
        this.#config();
    }

    //#-> Para crear método privado
    #config() {
        let tokenC = new TokenController();
        //Construir objeto
        const productC = new ProductController();
        //Configurar rutas
        //ruta pública
        this.router.get('/product', productC.get);
        //middleware
        this.router.use(tokenC.verifyAuth);
        //rutas privadas
        this.router.post('/product', productC.create);
        this.router.put('/product', productC.update);
        this.router.get('/product/user', productC.getByUser);
        this.router.delete('/product', productC.delete);
    }

}

module.exports = ProductRouter;