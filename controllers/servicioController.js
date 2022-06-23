const { response } = require('express');
const Servicio = require("../models/Servicio");

const listServices = async (req, res = response) => {
    try {
        let services = [];
        services = await Servicio.find();
        if (null != services) {
            return res.json({
                ok: true,
                servicios: services
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudieron listar los servicios"
        })
    }
}

module.exports = {
    listServices
};