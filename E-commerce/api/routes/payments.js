const express = require("express");
const router = express.Router();
const {initPaymentMp} = require('../controllers/payments');
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
router.get('/pending', (req, res) => {
    console.log(req.query);
    res.send('Pago pending');
});
module.exports = router;