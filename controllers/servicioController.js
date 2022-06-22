const { response } = require('express');
const Servicio = require("../models/Servicio");

const listServices = async (req, res = response) => {

    let services = await Servicio.findAll();
    if (null == services || services.isEmpty()) {
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