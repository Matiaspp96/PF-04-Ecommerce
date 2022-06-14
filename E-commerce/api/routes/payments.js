const express = require("express");
const router = express.Router();
const { initPaymentMp, successPay, pendingPay, failurePay, statusPay } = require('../controllers/payments');
const orderModel = require('../models/orders');

// crear una ruta para el pago de mercado pago
router.post('/checkoutmp', initPaymentMp );

// pago exitoso
router.get('/success', successPay);

// pago fallido
router.get('/failure', failurePay);

// pago pendiente
router.get('/pending', pendingPay);

//consutar el estado del pago
router.get('/updatestatuspayment/:preference_id', statusPay);

module.exports = router;