const UserSchema = require("../models/userSchema");
const postSchema = require("../models/postSchema");
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

const createPost = async (req, res) => {
    try {
        const newPost = new postSchema(req.body);
        
        const savedPost = await newPost.save();
        
        res.status(201).json({
            message: "Post adicionado com sucesso!",
            savedPost
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    };
}

const deletePost = async (req, res) => {    
    try {
        req.body = await postSchema.remove(req.body);
        const removerPost = req.body;
        () => {
            removerPost.remove();
        }
        res.status(200).json({
            message: "Post deleted!"
        });
} catch (error) {
    res.status(500).json({
    message: error.message
})
};
}

module.exports = {
    createUser,
    deleteUser,
    createPost,
    deletePost,
}