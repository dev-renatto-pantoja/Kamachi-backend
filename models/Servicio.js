const { Schema, model } = require("mongoose");

const ServicioSchema = new Schema({
    sector: {
        type: String,
        require: true,
    },
    nombre: {
        type: String,
        require: true,
        unique: true
    }
});

const Servicio = model("Servicio", ServicioSchema);

module.exports = { Servicio, ServicioSchema };