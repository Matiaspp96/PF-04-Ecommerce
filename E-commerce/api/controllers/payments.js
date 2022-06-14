const mercadopago = require('mercadopago');
const { transporter, emailOrder } = require('../config/email');
const orderModel = require(`../models/orders`);
const userModel = require('../models/users');
const {handleHttpError} = require('../utils/handleError');

mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
});

const initPaymentMp = async (req, res) => {

    const {items, email,phone,name, idOrder} = req.body;
    const order = await orderModel.findById(idOrder);

    let dataPay = {
        payer: {
                phone: {
                    area_code: "",
                    number: Number(phone)
                },
                email: email,
                identification: {
                    number: "",
                    type: ""
                },
                name: name,
                surname: "",
                date_created: null,
                last_purchase: null
        },
		items: items,
        payment_methods: {
            excluded_payment_types: [
                {
                    id: "ticket"
                },
                {
                    id: "pse"
                }
            ],
            installments: 6
            },
		back_urls: {
			"success": `${process.env.API_URL}/api/payments/success`,
			"failure": `${process.env.API_URL}/api/payments/failure`,
			"pending": `${process.env.API_URL}/api/payments/pending`
		},
		auto_return: "approved",
	};
   
    try {
        const preference = await mercadopago.preferences.create(dataPay);
        order.paymentId = preference.body.id;
        await order.save();
      
          res.send({ preference });
    } catch (e) {
        handleHttpError(res, e);
    }
};
const successPay= async (req, res) => { 
    //lista
    try{
        const order = await orderModel.findOne({paymentId : req.query.preference_id}).populate('buyer');

        order.statusPay = req.query.status;
        order.payment = req.query.payment_type;
        order.merchant_id = req.query.merchant_order_id;
        order.statusPurchase = 'payment received';
        await order.save();
        const user = {
            name:order.buyer.name,
            email:order.buyer.email,
        };
          //enviar email
        await transporter.sendMail(emailOrder(user, order));
    
        return res.redirect(process.env.HOST_CLIENT);
    }catch (e){
        handleHttpError(res, e);   
    };
    

};
const pendingPay= async (req, res) => { 

    try{
        const order = await orderModel.findOne({paymentId : req.query.preference_id}).populate('buyer');

        order.statusPay = req.query.status;
        order.payment = req.query.payment_type;
        order.merchant_id = req.query.merchant_order_id;
        order.statusPurchase = 'validating payment';
        await order.save();
        const user = {
            name:order.buyer.name,
            email:order.buyer.email,
        };
          //enviar email DE PENDIENTE
        //await transporter.sendMail(emailOrder(user, order));
    
        return res.redirect(process.env.HOST_CLIENT);
    }catch (e){
        handleHttpError(res, e);   
    };
};
const failurePay= async (req, res) => { 

    try{
        const order = await orderModel.findOne({paymentId : req.query.preference_id});
        order.statusPay = req.query.status;
        order.payment = req.query.payment_type;
        order.statusPurchase = 'payment not received';
        await order.save();
    }catch (e){
        handleHttpError(res, e);
    }
    
    //redirigir al usuario a la pagina de usuarios/ordenes
    return res.redirect(process.env.HOST_CLIENT);
};
const statusPay= async (req, res) => { 
//en construccion
};

module.exports = { initPaymentMp,successPay, pendingPay, failurePay, statusPay };