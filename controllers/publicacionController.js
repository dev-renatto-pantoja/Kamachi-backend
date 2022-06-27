const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const { Servicio } = require("../models/Servicio");
const {Publicacion} = require("../models/Publicacion");
const {createPayment} = require("./pagoController");

const updateInfo = async (req, res = response) => {
    try {
        const { email, sector, nombre, costo, realizado } = req.body;
        let publication = await Publicacion.findOne({ email });
        if (null != publication) {
            publication.servicio.sector = sector;
            publication.servicio.nombre = nombre;
            publication.pago.costo = costo;
            publication.pago.realizado = realizado;
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
        const { email, nombre, costo } = req.body;
        let user = await Usuario.findOne({ email });
        let service = await Servicio.findOne({ nombre });
        if (null != user && null != service && user.rol === "vendedor") {
            const publishDate = new Date().toLocaleDateString();
            const realizado = false;
            const payment = createPayment(costo, realizado);
            const publication = new Publicacion({
                usuario: user,
                servicio: service,
                pago: payment,
                fecha_publicacion: publishDate
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

const findPublication = async (req, res = response) => {
    try {
        const {email} = req.body;
        let publication = await Publicacion.findOne({email});
        if (null != publication) {
            return res.json({
                ok: true,
                publicacion: publication
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo encontrar la publicacion"
        })
    }
}

module.exports = {
    updateInfo,
    publishService,
    deletePublication,
    listPublications,
    listPublicationsByService,
    findPublication
};