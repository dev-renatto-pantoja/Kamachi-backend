const {Schema, model} = require("mongoose");
const {UsuarioSchema} = require("./Usuario");
const {PublicacionSchema} = require("./Publicacion");

const ContratoSchema = new Schema({
    usuario: {
        type: UsuarioSchema,
        required: true
    },
    publicacion: {
        type: PublicacionSchema,
        required: true
    },
    fecha_contratacion: {
        type: Date,
        required: true
    }
});

const Contrato = model("Contrato", ContratoSchema);

module.exports = {Contrato, ContratoSchema};
