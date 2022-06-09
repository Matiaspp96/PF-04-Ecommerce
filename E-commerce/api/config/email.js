require("dotenv").config();
const nodemailer = require("nodemailer");
const { API_URL, HOST, USER, PASS, PORTGMAIL } = process.env;

const transporter = nodemailer.createTransport({
  host: HOST,
  port: PORTGMAIL,
  secure: true, // true for 465, false para otros puertos
  auth: {
    user: USER,
    pass: PASS,
  },
});

const emailer = function (users) {
  return {
    from: '"Pet Elegant Ecommerce" <pet.elegant.ecommerce.henry@gmail.com>',
    to: users.email,
    subject: "Bienvenido a Pet Elegante",
    html: ` 
    <div style="background-color: #2b9423; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    <h2 style="color: #fff;">Hola ${
      users.name
    }, Pet Elegant te da la bienvenida a tienda, gracias por sumarte! </h2>
    </ul>
    </div>
    <ul>
    
    <h3 style="color: #000000;">ESTOS SON LOS DATOS DE TU CUENTA:</h3>
    <h4 style="color: #000000;">- Nombre: ${users.name}</h4>
    <h4 style="color: #000000;">- password: ${users.password}</h4>
    <h4 style="color: #000000;">- Email: ${users.email}</h4>
    <h4 style="color: #000000;">- Teléfono: ${
      users.phone ? users.phone : "-"
    }</h4>
    </ul>
    <ul><br><br>
    <h3 style="color: #000000;">Consejos de seguridad:</h3>
    <li style="color: #000000;">Mantenga los datos de su cuenta en un lugar seguro.</li>
    <li style="color: #000000;">No comparta los detalles de su cuenta con otras personas.</li>
    <li style="color: #000000;">Cambie su clave regularmente.</li>
    <li style="color: #000000;">Si sospecha que alguien está usando ilegalmente su cuenta, avísenos inmediatamente.</li>
    </ul>
    <ul>
    <h3 style="color: #000000;">Ahora podrá realizar pedidos en nuestra tienda: <a href="https://petelegant.vercel.app/">Pet Elegant Ecommerce</a></h3>
    </ul> `,
  };
};

const emailOrder = function (user, data) {
  return {
    from: '"Pet Elegant Ecommerce " <pet.elegant.ecommerce.henry@gmail.com>',
    to: user.email,
    subject: "Compra realizada correctamente",
    attachDataUrls: true,
    html: `
    <div style="background-color: #2b9423; color: #fff; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    <h1 style="color: #fff;">Hola ${user.name}, gracias por elegirnos!</h1>
    </ul>
    </div>
    <h2 style="color: #000000">Tu compra se procesó correctamente, a continuación te dejamos los detalles de la misma: </h2>
    <div style="background-color: #fff; color: #000000; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    ${console.log("Esto est data.products" + data.products)}
    ${data.products.map(
      (e) => `
    /* <img src=${API_URL}/products/images/${e.image} width="140" height="180" align="right" > */
    <h3 style="color: color: #000000;"> - ${e.name}</h3>
    <h4 style="color: color: #000000;">Precio unitario: ${e.price}</h4>
    <h4 style="color: color: #000000;">Cantidad: ${e.quantity}</h4>
    <h4 style="color: color: #000000;">Características: ${e.description}</h4>
    `
    )}
    </ul>
    </div>
    <div style="background-color: #fff; color: #000000; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3px 10px; font-weight: bold; border-radius: 5px;">
    <ul>
    <h2 style="color: #000000;">Dirección de entrega:</h2>
    <li style="color: #000000;">Ciudad: ${
      data.shipping?.state ? data.shipping.state : "-"
    }</li>
    <li style="color: #000000;">Calle: ${
      data.shipping?.street ? data.shipping.street : "-"
    }</li>
    <li style="color: #000000;">Número: ${
      data.shipping?.number ? data.shipping.number : "-"
    }</li>
    <li style="color: #000000;">Piso: ${
      data.shipping?.floor ? data.shipping.floor : "-"
    }</li>
    <li style="color: #000000;">Entre calles: ${
      data.shipping?.between ? data.shipping.between : "-"
    }</li>
    <li style="color: #000000;">Código Postal: ${
      data.shipping?.zip ? data.shipping.zip : "-"
    }</li>
    </ul>
    </div>
    
    <h3 style="color: #000000">El plazo de entrega varía según la modalidad elegida:</h3>
    <li style="color: #000000;">Envío a domicilio: hasta 7 días hábiles. Las entregas se realizan de lunes a viernes, solamente al titular de la compra, presentando DNI y tarjeta con la que se realizó el pedido.</li>
    <li style="color: #000000;">Retiro en sucursal: hasta 7 días hábiles. Recibirás confirmación por esta vía cuando el pedido esté disponible para retiro en sucursal.</li>
  
    <h3 style="color: #000000">La compra sólo podrá retirarla el titular de la tarjeta utilizada para la compra presentando la siguiente documentación:</h3>
    <li style="color: #000000;">Factura de compra (impresa o en tu celular).</li>
    <li style="color: #000000;">DNI del titular de la tarjeta con la que se realizó el pago.</li>
    <li style="color: #000000;">Tarjeta de crédito utilizada para realizar la compra.</li>
    <br /><br />
    <p style="color: #000000">Número de Orden: <span style="font-weight: bold; text-decoration: underline;">${
      data._id
    }</span><br /><br />All rights reserved by &copy; <a href="https://petelegant.vercel.app/">Pet Elegant</a></p>
    `,
  };
};

module.exports = {
  transporter,
  emailer,
  emailOrder,
};
