const { response } = require('express');
const {Pago} = require("../models/Pago");

const createPayment = async (req, res = response) => {
    try {
        const {costo, realizado} = req.body;
        let payment = new Pago({
            costo: costo,
            realizado: realizado
        });
        await payment.save();
        return res.json({
            ok: true,
            pago: payment
        })
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: "No se pudo crear el pago"
        })
    }
}


module.exports = {
    createPayment
};