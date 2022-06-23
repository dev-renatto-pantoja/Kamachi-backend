const { response } = require('express');
const Usuario = require("../models/Usuario");

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
    updateInfo
};