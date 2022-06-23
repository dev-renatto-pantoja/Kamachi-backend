const { response } = require('express');
const Servicio = require("../models/Servicio");

const listServices = async (req, res = response) => {
    let services = [];
    services = await Servicio.find();
    if (null != services) {
        return res.json({
            ok: true,
            listaServicios: services
        })
    } else {
        return res.status(400).json({
            ok: false,
            msg: "Servicios por poblar"
        })
    }
}

module.exports = {
    listServices
};