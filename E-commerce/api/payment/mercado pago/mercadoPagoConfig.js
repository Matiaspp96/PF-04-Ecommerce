const mercadopago = require('mercadopago');
mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN_MP
});

const preference = {
  items: [
    {
      title: 'Test',
      quantity: 1,
      currency_id: 'locale',
      unit_price: 100
    }
  ]
};

mercadopago.preferences.create(preference)