const {response} = require("express");
const Publicacion = require("../models/Publicacion");

const updateInfo = async (req, res = response) => {
    try {
        const {email, costo} = req.body;
        let publication = await Publicacion.findOne({email});
        if (null != publication){
            publication.costo = costo;
            await publication.save();
            return res.json({
                ok: true,
                email: publication.usuario.email,
                costo: publication.costo
            })
        } else {
            return res.status(400).json({
                ok: false,
                msg: "No existe dicha publicación"
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