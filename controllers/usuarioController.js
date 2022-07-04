const { response } = require('express');
const {Usuario} = require("../models/Usuario");

const listUsers = async (req, res = response) => {
    try {
        let users = [];
        users = await Usuario.find();
        if (null != users) {
            return res.json({
                ok: true,
                usuarios: users
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo listar todos los usuarios"
        })
    }
}

const findUser = async (req, res = response) => {
    try {
        const {email} = req.body;
        let user = await Usuario.findOne({email});
        if (null != user) {
            return res.json({
                ok: true,
                usuario: user
            })
        }
    } catch (error){
        return res.status(400).json({
            ok: false,
            msg: "No se pudo encontrar el usuario"
        })
    }
}

const removeUser = async (req, res = response) => {
    try {
        const {email} = req.body;
        let user = await Usuario.findOne({email});
        if (null != email) {
            user.remove();
            return res.json({
                ok: true,
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo eliminar el usuario"
        })
    }
}

const updateInfo = async (req, res = response) => {
    try {
        const {email, telefono, distrito, rol} = req.body;
        let user = await Usuario.findOne({email});
        if (null != user){
            user.telefono = telefono;
            user.distrito = distrito;
            user.rol = rol;
            await user.save();
            return res.json({
                ok: true,
                usuario: user
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo actualizar la información"
        })
    }
}

module.exports = {
    listUsers,
    findUser,
    removeUser,
    updateInfo
};