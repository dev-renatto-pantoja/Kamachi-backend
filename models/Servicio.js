const {Schema, model} = require("mongoose");

const ServicioSchema = new Schema({
    nombre: {
        type: String,
        require: true,
        unique: false
    },
    distrito: {
        type: String,
        require: true,
        unique: false
    },
    telefono: {
        type: Number,
        require: true,
        unique: true
    },
    calificacion: {
        type: Number,
        require: true,
        unique: false
    }
})

module.exports = model("Servicio", ServicioSchema);