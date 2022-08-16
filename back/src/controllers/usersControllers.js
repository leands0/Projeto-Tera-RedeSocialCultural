const UserSchema = require("../models/userSchema");
const bcrypt = require("bcrypt");
const { db } = require("../models/userSchema");

const createUser = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;
    
    try {
        const newUser = new UserSchema(req.body);
        
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: "User adicionado com sucesso!",
            savedUser
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    };
}

const deleteUser = async (req, res) => {    
        try {
            req.body = await UserSchema.remove(req.body);
            const removerUser = req.body;
            () => {
                removerUser.remove();
            }
            res.status(200).json({
                message: "User deleted!"
            });
    } catch (error) {
        res.status(500).json({
        message: error.message
    })
};
}

module.exports = {
    createUser,
    deleteUser
}