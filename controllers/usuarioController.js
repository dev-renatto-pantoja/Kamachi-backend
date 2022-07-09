const { response } = require('express');
const {Usuario} = require("../models/Usuario");
const {Historial} = require("../models/Historial");
const {Publicacion} = require("../models/Publicacion");

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

const rateUserService = async (req, res = response) => {
    try {
        const {email, publicacionId} = req.body;
        let historical = await Historial.findOne({"usuario.email": email});
        if (null != historical) {
            let counter = 0;
            historical.publicaciones.forEach(element => {
                if (element._id.toString() === publicacionId) {
                    counter = 1;
                }
            });
            let publication = await Publicacion.findById(publicacionId);
            if (counter === 1 && publication.usuario.rol === "vendedor") {
                let user =  await Usuario.findById(publication.usuario._id.toString());
                if (null == user.calificacion){
                    user.calificacion = 10;
                    await user.save();
                    return res.json({
                        ok: true,
                        mgs: "Se califico al proveedor"
                    })
                } else {
                    user.calificacion = user.calificacion + 10;
                    await user.save();
                    return res.json({
                        ok: true,
                        mgs: "Se califico al proveedor"
                    })
                }
            }
        } else {
            return res.status(400).json({
                ok: false,
                mgs: "No existe el historial"
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo calificar al proveedor"
        })
    }
}

module.exports = {
    listUsers,
    findUser,
    removeUser,
    updateInfo,
    rateUserService
};