const User = require('../models/user');
const jwt = require('jsonwebtoken');

class UserController {

    register(req, res) {
        let objUser = req.body;
        if (objUser.name && objUser.lastname && objUser.email && objUser.password) {
            //Guardar usuario en la BD
            User.create(objUser, (error, doc) => {
                if (error) {
                    res.status(500).json({ info: error });
                } else {
                    console.log(doc);
                    let token = jwt.sign({ id: doc._id }, process.env.JWT_PRIVATE_KEY);
                    res.status(201).json({ token });
                }
            });
        } else {
            res.status(400).json({ info: "Datos incompletos" });
        }
    }

    login(req, res) {
        let { email, password } = req.body;
        User.findOne({ email, password }, (error, doc) => {
            if (error) {
                res.status(500).json({ error });
            } else {
                if (doc != null && doc != undefined) {
                    let token = jwt.sign({ id: doc._id }, process.env.JWT_PRIVATE_KEY);
                    res.status(200).json({ token });
                }else{
                    res.status(401).json({info: 'Credenciales inválidas'});
                }
            }
        });
    }


}

module.exports = UserController;