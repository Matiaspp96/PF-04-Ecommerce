const mercadopago = require('mercadopago');
const {handleHttpError} = require('../utils/handleError');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP,
});

const initPaymentMp = async (req, res) => {
   
      
    const {description, quantity, currency_id, unit_price, email,phone,name,total_amount, metadata} = req.body;

    let dataPay = {
        payer: {
                phone: {
                    area_code: "",
                    number: Number(phone)
                },
                address: {
                    zip_code: "",
                    street_name: "",
                    street_number: 5
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
        shipments: {
            default_shipping_method: 2,
            receiver_address: {
                zip_code: "",
                street_name: "",
                street_number: 4,
                floor: "",
                apartment: "",
                city_name: null,
                state_name: null,
                country_name: null
            }
        },
    
		items: [
			{

				 title: description,
			     unit_price: Number(unit_price),
				 quantity: Number(quantity)
			},
           
		],
        total_amount: null,
		back_urls: {
			"success": "http://localhost:3001/api/payments/success",
			"failure": "http://localhost:3001/api/payments/failure",
			"pending": "http://localhost:3001/api/payments/pending"
		},
		auto_return: "approved",
        metadata : {
            email : metadata.email
        }
	};
    try {
        const preference = await mercadopago.preferences.create(dataPay);
        //OJO SETEAR EL ID DE LA PREFERENCIA LA ORDER, PARA PODER DARLE PERSISTENCIA AL ESTADO DEL PAGO
        // EN PREFERENCE VIEDE COMO id, pero en la respuesta del estado del pago viene por query como preference_id
        res.send({ preference });
    } catch (e) {
        handleHttpError(res, e);
    }
};

const pendingPay= async (req, res) => { 
    console.log(req.query);

}

module.exports = { initPaymentMp };