const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const Publicacion = require("../models/Publicacion");

const updateInfo = async (req, res = response) => {
    try {
        const { email, nombre, costo } = req.body;
        let publication = await Publicacion.findOne({ email });
        let service = await Servicio.findOne({ nombre });
        if (null != publication && null != service) {
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
    console.log("llego al metodo");
    try {
        const { email, nombre, costo } = req.body;
        console.log(`paso body ${email} - ${nombre} - ${costo}`);
        let user = await Usuario.findOne({ email });
        console.log(`encontro Usuario - ${user}`)
        let service = await Servicio.findOne({ nombre });
        console.log(`encontro Usuario - ${user}`)
        if (null != user && null != service && user.rol === "vendedor") {
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
        const { email } = req.body;
        let publication = await Publicacion.findOne({ email });
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

const listPublications = async (req, res = response) => {
    console.log("Antes de listar");
    try {
        let publications = [];
        publications = await Publicacion.find();
        if (null != publications) {
            return res.json({
                ok: true,
                publicaciones: publications
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudieron listar las publicaciones"
        })
    }
}

const listPublicationsByService = async (req, res = response) => {
    try {
        const { name } = req.body;
        let publications = [];
        publications = await Publicacion.find({ name });
        if (null != publications) {
            return res.json({
                ok: true,
                publicaciones: publications
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudieron listar las publicaciones por servicio"
        })
    }
}

module.exports = {
    updateInfo,
    publishService,
    deletePublication,
    listPublications,
    listPublicationsByService
};