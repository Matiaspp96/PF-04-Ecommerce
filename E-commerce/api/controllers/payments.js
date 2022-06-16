const mercadopago = require("mercadopago");
const orderModel = require(`../models/orders`);
const userModel = require('../models/users');
const productModel = require('../models/products');
const { emailOrder, transporter, emailOrderFailure, emailOrderPending, emailSaleNotification} = require('../config/email');
const {handleHttpError} = require('../utils/handleError');
mercadopago.configure({
  access_token: process.env.ACCESS_TOKEN_MP,
});

const initPaymentMp = async (req, res) => {
  const { items, email, phone, name, idOrder } = req.body;
  const order = await orderModel.findById(idOrder);

  let dataPay = {
    payer: {
      phone: {
        area_code: "",
        number: Number(phone),
      },
      email: email,
      identification: {
        number: "",
        type: "",
      },
      name: name,
      surname: "",
      date_created: null,
      last_purchase: null,
    },
    items: items,
    payment_methods: {
      excluded_payment_types: [
        {
          id: "ticket",
        },
        {
          id: "pse",
        },
      ],
      installments: 6,
    },
    back_urls: {
      success: `${process.env.API_URL}/api/payments/success`,
      failure: `${process.env.API_URL}/api/payments/failure`,
      pending: `${process.env.API_URL}/api/payments/pending`,
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
        const order = await orderModel.findOne({paymentId : req.query.preference_id})
        .populate('buyer')
        .populate('products');
        const updateStock = await order.products.map( async (product) => {
           let quantity = product.quantity; 
           let productUpdate = await productModel.findOne({_id: product._id});
           productUpdate.stock = productUpdate.stock - quantity;
           await productUpdate.save();
        });
        Promise.all(updateStock);
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
        let admins = await userModel.find({role:'admin'});
    
         admins.map(async (admin) => {
               await transporter.sendMail(emailSaleNotification(admin.email, order));
         });
         Promise.all(admins);

        return res.redirect(process.env.HOST_CLIENT);

    }catch (e){
        handleHttpError(res, e);   
    };
};
const pendingPay = async (req, res) => {

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
         await transporter.sendMail(emailOrderPending(user, order));
         return res.redirect(process.env.HOST_CLIENT);
    }catch (e){
        handleHttpError(res, e);   
    };
    
   
};
const failurePay = async (req, res) => {
  try {
    const order = await orderModel.findOne({
      paymentId: req.query.preference_id,
    }).populate('buyer');
    order.statusPay = req.query.status;
    order.payment = req.query.payment_type;
    order.statusPurchase = "payment not received";
    await order.save();
    const user = {
      name:order.buyer.name,
      email:order.buyer.email,
  };
   //redirigir al usuario a la pagina de usuarios/ordenes
   await transporter.sendMail(emailOrderFailure(user, order));
   return res.redirect(process.env.HOST_CLIENT);
  } catch (e) {
    handleHttpError(res, e);
  }
};
const statusPay = async (req, res) => {
  //en construccion
};

module.exports = {
  initPaymentMp,
  successPay,
  pendingPay,
  failurePay,
  statusPay,
};
