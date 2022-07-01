const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const { Servicio } = require("../models/Servicio");
const {Publicacion} = require("../models/Publicacion");
var nodemailer = require('nodemailer');

// falta revisar
const updateInfo = async (req, res = response) => {
    try {
        const { email, sector, nombre, monto} = req.body;
        let publication = await Publicacion.findOne({ email });
        if (null != publication) {
            publication.servicio.sector = sector;
            publication.servicio.nombre = nombre;
            publication.monto = monto;
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
        const { email, nombre, monto } = req.body;
        let user = await Usuario.findOne({ email });
        let service = await Servicio.findOne({ nombre });
        if (null != user && null != service && user.rol === "vendedor") {
            const publishDate = new Date().toLocaleDateString();
            const publication = new Publicacion({
                usuario: user._id,
                servicio: service._id,
                monto: monto,
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
        const { id } = req.body;
        let publication = await Publicacion.findById(id);
        if (null != publication) {
            await publication.remove();
            return res.json({
                ok: true
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

const listPublicationsBySector = async (req, res = response) => {
    try {
        const { sector } = req.body;
        let publications = [];
        publications = await Publicacion.find({ sector });
        if (null != publications) {
            return res.json({
                ok: true,
                publicaciones: publications
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudieron listar las publicaciones por sector"
        })
    }
}

const findPublication = async (req, res = response) => {
    try {
        const {id} = req.body;
        let publication = await Publicacion.findById(id);
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

const mailing = async (req, res= response) => {
    try {
        const {email, publicationId} = req.body;
        let publication = await Publicacion.findOne({_id: publicationId});
        let user = await Usuario.findOne({email});
        const clientEmail = user.email;
        const sellerEmail = publication.usuario.email;

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'youremail@gmail.com',
                pass: 'yourpassword'
            }
        });

        var mailOptions = {
            from: clientEmail,
            to: sellerEmail,
            subject: 'Kamachi | Contrato',
            text: 'Deseo contratar tu servicio!'
        };

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
                return res.json({ok: true})
            }
        });
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo enviar el email"
        })
    }
}

const rating = async (req, res = response) => {
    try {
        const {email} = req.body;
        return res.json({ok: true})
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo calificar"
        })
    }
}

module.exports = {
    updateInfo,
    publishService,
    deletePublication,
    listPublications,
    listPublicationsBySector,
    findPublication,
    mailing
};