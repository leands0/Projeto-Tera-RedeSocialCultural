const UserSchema = require('../models/userSchema');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SECRET = process.env.SECRET;


const login = (req, res) => {
    // receber o email senha
 
    try {
        UserSchema.findOne({ email: req.body.email }, (error, user) => {
            // consultar no banco se esse usuário existe
            if(!user) {
                return res.status(401).send({
                    message: "User não encontrado",
                    email: `${req.body.email}`
                })
            };
            
            // conferir se a senha enviada na requisição corresponde a senha armazenada no banco de dados
    
           const validPassword = bcrypt.compareSync(req.body.password, user.password);
    
           if(!validPassword) {
            return res.status(401).send({
                message: "Login não autorizado"
            })
            }
    
            // gero um token
    
            const token = jwt.sign({ name: user.name}, SECRET)
            
            // envio a resposta da minha requisição
            res.status(200).send({
                message: "Login autorizado",
                token
            })
    
        })
    } catch(e) {
        console.error(e)
    }
};

module.exports = {
    login
};