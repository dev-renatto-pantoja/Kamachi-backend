const { response } = require('express');
const { Servicio } = require("../models/Servicio");

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

const createService = async (req, res = response) => {
    console.log("llego a crear");
    try {
        const { sector, nombre } = req.body;
        let servicio = await Servicio.findOne({nombre});
        if (null === servicio) {
            let service = new Servicio({
                sector: sector,
                nombre: nombre
            });

            await service.save();
            return res.json({
                ok: true,
                servicio: service
            })
        } else {
            return res.json({
                ok:false,
                msg:"El servicio ya existe"
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo crear el servicio"
        })
    }
}

const findService = async (req, res = response) => {
    try {
        const { nombre } = req.body;
        let service = await Servicio.findOne({ nombre });
        if (null != service) {
            return res.json({
                ok: true,
                servicio: service
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo encontrar el servicio"
        })
    }
}

const removeService = async (req, res = response) => {
    try {
        const { nombre } = req.body;
        let service = await Servicio.findOne({ nombre });
        if (null != service) {
            service.remove();
            return res.json({
                ok: true,
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo eliminar el servicio"
        })
    }
}

const updateInfo = async (req, res = response) => {
    try {
        const { sector, nombre } = req.body;
        let service = await Servicio.findOne({ nombre });
        if (null != service) {
            service.service = service;
            service.nombre = nombre;
            await service.save();
            return res.json({
                ok: true,
                servicio: service
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo actualizar la servicio"
        })
    }
}

module.exports = {
    listServices,
    createService,
    findService,
    removeService,
    updateInfo
};