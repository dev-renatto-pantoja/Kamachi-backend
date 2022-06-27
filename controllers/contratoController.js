const { response } = require("express");
const { Usuario } = require("../models/Usuario");
const {Publicacion} = require("../models/Publicacion");
const {Contrato} = require("../models/Contrato");

const createContract = async (req, res = response) => {
    try {
        const { email, id} = req.body;
        let user = await Usuario.findOne({ email });
        let publication = await Publicacion.findById({ id });
        if (null != user && null != publication && user.rol === "cliente") {
            const publishDate = new Date().toLocaleDateString();
            const contract = new Contrato({
                usuario: user,
                publicacion: publication,
                fecha_publicacion: publishDate
            });
            await contract.save();
            return res.json({
                ok: true,
                contrato: contract
            })
        }
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo publicar el contrato"
        })
    }
}

module.exports = {
    createContract
};