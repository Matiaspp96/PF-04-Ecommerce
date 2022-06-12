const mercadopago = require('mercadopago');
const orderModel = require(`../models/orders`);
const {handleHttpError} = require('../utils/handleError');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
});

const initPaymentMp = async (req, res) => {
   
      console.log(req.body);
    const {items, email,phone,name, idOrder} = req.body;

    const order = await orderModel.findById(idOrder);

    let dataPay = {
        payer: {
                phone: {
                    area_code: "",
                    number: Number(phone)
                },
                // address: {
                //     zip_code: "",
                //     street_name: "",
                //     street_number: 5
                // },
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
		back_urls: {
			"success": `${process.env.API_URL}/api/payments/success`,
			"failure": `${process.env.API_URL}/api/payments/failure`,
			"pending": `${process.env.API_URL}/api/payments/pending`
		},
		auto_return: "approved",
	};
   
    try {
        const preference = await mercadopago.preferences.create(dataPay);
        //OJO SETEAR EL ID DE LA PREFERENCIA LA ORDER, PARA PODER DARLE PERSISTENCIA AL ESTADO DEL PAGO
        // EN PREFERENCE VIEDE COMO id, pero en la respuesta del estado del pago viene por query como preference_id
     
        order.paymentId = preference.body.id;
        await order.save();
      
         res.send({ preference });
        //res.redirect(preference.body.sandbox_init_point);
    } catch (e) {
        handleHttpError(res, e);
    }
};

const pendingPay= async (req, res) => { 
    console.log(req.query);

}

module.exports = { initPaymentMp };