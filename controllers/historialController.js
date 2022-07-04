const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const { Historial } = require("../models/Historial");

const createHistorical = function (email) {
    let user = Usuario.findOne({ email });
    let id = user._id;
    let historical = Historial.findOne({ "usuario": id })
    if (!historical.exists) {
        let hist = new Historial({
            usuario: id,
            publicaciones: []
        });
        hist.save();
        return hist._id;
    } else {
        return historical._id;
    }
}

const addHistorical = async (req, res = response) => {
    try {
        const { email, publicationId } = req.body;
        const id = createHistorical(email);
        let historical = await Historial.findById(id);
        historical.publicaciones.push(publicationId);
        await historical.save();
        return res.json({
            ok: true,
            historial: historical
        })
    }
    catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo añadir al historial"
        })
    }
}

module.exports = { addHistorical }