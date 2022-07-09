const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const { Historial } = require("../models/Historial");
const {Publicacion} = require("../models/Publicacion");

const updateHistoricalByUser = async (req, res = response) => {
    try {
        const {email, publicationId} = req.body;
        let historical = await Historial.findOne({"usuario.email": email});
        if (null != historical) {
            let publication = await Publicacion.findById(publicationId);
            historical.publicaciones.push(publication);
            await historical.save();
            return res.json({ok: true, msg: "La publicacion se añadio al historial"});
        }
        if (null == historical) {
            let user = await Usuario.findOne({ email });
            let publication = await Publicacion.findById(publicationId);
            let hist = new Historial({
                usuario: user,
                publicaciones: [publication]
            });
            await hist.save();
            return res.json({ok: true, msg: "La creo un historial a partir de la publicacion"});
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo actualizar el historial"
        })
    }
}

const findHistoricalByUser = async (req, res = response) => {
    try {
        const { email } = req.body;
        let user = await Usuario.findOne({email});
        let historical = await Historial.findOne({ "usuario": user });
        if (null != historical) {
            return res.json({
                ok: true,
                historial: historical
            })
        } else {
            return res.json({
                ok: true,
                msg: "Historial vacio"
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo encontrar la publicacion"
        })
    }
}

module.exports = { updateHistoricalByUser, findHistoricalByUser }