const { response } = require('express');
const Servicio = require("../models/Servicio");

const listServices = async (req, res = response) => {

    let services = [];
    services = await Servicio.find();
    if (null == services || services.exists) {
        return res.status(400).json({
            ok: false,
            msg: "Servicios por poblar"
        })
    } else {
        return res.json({
            ok: true,
            listaServicios: services
        })
    }
}

module.exports = {
    listServices
};