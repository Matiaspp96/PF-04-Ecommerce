const express = require("express");
const router = express.Router();
const {initPaymentMp} = require('../controllers/payments');
const orderModel = require('../models/orders');
router.get('/', (req, res) => {
    res.send('Hello World!');
});
// crear una ruta para el pago de mercado pago
router.post('/checkoutmp', initPaymentMp )
// pago exitoso
router.get('/success', (req, res) => {
    console.log(req.query);
    res.send('Pago exitoso');
});
// pago fallido
router.get('/failure', (req, res) => {
    console.log(req.query);
    res.send('Pago failure');
});
// pago pendiente
router.get('/pending', async (req, res) => {

    console.log(req.query);
    const order = await orderModel.findOne({paymentId : req.query.preference_id});
    order.status = req.query.status;
    order.payment = req.query.payment_type;
    await order.save();
    //redirigir al usuario a la pagina de usuarios/ordenes
    const validate = await orderModel.findOne({paymentId : req.query.preference_id});
    console.log(validate);
    res.send('Pago pending');
});
module.exports = router;