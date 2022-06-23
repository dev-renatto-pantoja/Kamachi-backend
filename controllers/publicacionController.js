const {response} = require("express");
const Usuario = require("../models/Usuario");
const Servicio = require("../models/Servicio");
const Publicacion = require("../models/Publicacion");

const updateInfo = async (req, res = response) => {
    try {
        const {email, nombre, costo} = req.body;
        let publication = await Publicacion.findOne({email});
        let service = await Servicio.findOne({nombre});
        if (null != publication && null != service){
            publication.servicio = service;
            publication.costo = costo
            await publication.save();
            return res.json({
                ok: true,
                publicacion: publication
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo actualizar la información"
        })
    }
}

const publishService = async (req, res = response) => {
    try {
        const {email, nombre, costo} = req.body;
        let user = await Usuario.findOne({email});
        let service = await Servicio.findOne({nombre});
        if (null != user && null != service && user.rol === "Contratante"){
            const publishDate = new Date().getDate();
            const publication = new Publicacion({
                usuario: user,
                servicio: service,
                fecha_publicacion: publishDate,
                costo: costo
            });
            await publication.save();
            return res.json({
                ok: true,
                publicacion: publication
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo publicar el servicio"
        })
    }
}

const deletePublication = async (req, res = response) => {
    try {
        const {email} = req.body;
        let publication = await Publicacion.findOne({email});
        if (null != publication) {
            await publication.remove();
            return res.json({
                ok: true,
                publicacion: publication
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo eliminar la publicación"
        })
    }
}

module.exports = {
    updateInfo,
    publishService,
    deletePublication
};