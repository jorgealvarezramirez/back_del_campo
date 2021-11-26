const Product = require('../models/product');
const jwt = require('jsonwebtoken');
const TokenController = require('./tokenController');

class ProductController{

    constructor(){
        this.tokenC = new TokenController();
    }

    create = (req, res)=>{
        //Capturar datos del cuerpo de la petición
        let {name, price, url_img} = req.body;
        //Obtener el token
        let token = this.tokenC.getToken(req);
        //Decodificar el token
        let decode = jwt.decode(token, process.env.JWT_PRIVATE_TOKEN);
        Product.create({name, price, url_img, user_id: decode.id}, (error, doc)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(201).json({info: 'Producto creado'});
            }
        });        
    }

    update = (req, res)=>{
        //Capturar id del producto
        let {id, name, price, url_img} = req.body;
        //Obtener el token
        let token = this.tokenC.getToken(req);
        //Decodificar el token
        let decode = jwt.decode(token, process.env.JWT_PRIVATE_TOKEN);
        let user_id = decode.id;
        //Buscar por id del producto y por id de usuario para actualizar la info
        Product.findOneAndUpdate({_id: id, user_id}, {name, price, url_img}, (error, doc)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json({info: 'Producto actualizado'});
            }
        });
    }

    //Crear método para obtener los productos por usuario
    getByUser = (req, res)=>{
        //Obtener id del usuario a partir del token
        let token = this.tokenC.getToken(req);
        let decode = jwt.decode(token);
        let user_id = decode.id;
        console.log(user_id);
        //Obtener productos del usuario de la BD
        Product.find({user_id}, (error, docs)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json(docs);
            }
        });
    }

    //Crear método para eliminar un producto
    delete = (req, res)=>{
        //Capturar id del producto
        let {id} = req.body;
        //Obtener el token
        let token = this.tokenC.getToken(req);
        //Decodificar el token
        let decode = jwt.decode(token, process.env.JWT_PRIVATE_TOKEN);
        let user_id = decode.id;
        //Eliminar producto de la base de datos
        Product.findOneAndRemove({_id: id, user_id}, (error, doc)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json({info: 'Producto eliminado'});
            }
        })
    }

    get = (req, res)=>{
        Product.find((error, docs)=>{
            if(error){
                res.status(500).json({error});
            }else{
                res.status(200).json(docs);
            }
        })
    }

}

module.exports = ProductController;