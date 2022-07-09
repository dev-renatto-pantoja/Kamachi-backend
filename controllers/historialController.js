const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const { Historial } = require("../models/Historial");
const {Publicacion} = require("../models/Publicacion");

const findHistorical = function (email) {
    return historical = Historial.findOne({"usuario.email": email});
}
const createHistorical = function (email, publicationId) {
    let user = Usuario.findOne({ email });
    let publication = Publicacion.findById(publicationId);
    let hist = new Historial({
        usuario: user,
        publicaciones: [publication]
    });
    hist.save();
}

const addHistorical = function (historical, publicationId) {
    const publication = Publicacion.findById(publicationId);
    historical.publicaciones.push(publication);
    historical.save();
}

const updateHistoricalByUser = async (req, res = response) => {
    try {
        const {email, publicationId} = req.body;
        const historical = findHistorical(email)
        if (null != historical) {
            createHistorical(email, publicationId)
            return res.json({ok: true})
        } else {
            addHistorical(historical, publicationId)
            return res.json({ok: true})
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