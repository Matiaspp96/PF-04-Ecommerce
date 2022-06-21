const { orderModel, productModel, userModel } = require("../models");
const { handleHttpError } = require("../utils/handleError");

const { transporter, emailer, emailShipping, emailOrderCancelled } = require("../config/email");

const getUserOrders = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userModel.findOne({ _id: id }).populate({
      path: "orders",
      populate: { path: "products" },
    });

    if (user.orders.length > 0) {
      res.json(user.orders);
    } else {
      res.status(404).send("The user does not have purchase orders");
    }
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_GET_ORDERS");
  }
};

const getItems = async (req, res) => {
  try {
    const data = await orderModel.find().populate("products").populate("buyer");
    if (data.length) {
      return res.status(200).send({ data });
    }
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_GET_ITEMS");
  }
};

const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await orderModel
      .findById(id)
      .populate("products")
      .populate("buyer");
    if (data) {
      res.status(200).send({ data });
    }
  } catch (e) {
    handleHttpError(res, "ERROR_GET_ITEM");
  }
};

const createItem = async (req, res) => {
  const {
    buyer,
    phone,
    products,
    shipping,
    payment,
    date,
    users,
    cost,
    quantity,
  } = req.body;

  try {
    const newOrder = new orderModel({
      phone,
      shipping,
      payment,
      date,
      cost,
      quantity,
    });

    newOrder.products = products;

    const foundUser = await userModel.findOne({ email: users.email });

    if (!foundUser) {
      const newUser = new userModel({
        name: users.name,
        email: users.email,
      });

      newOrder.buyer = newUser;
      transporter.sendMail(emailer(users));
      const savedUser = await newUser.save();
    } else {
      newOrder.buyer = foundUser;
    }

    if (newOrder) {
      const savedOrder = await newOrder.save();
      userOrder = await userModel.updateOne(
        { email: users.email },
        { $addToSet: { orders: [savedOrder] } }
      );
      userShipping = await userModel.updateOne(
        { email: users.email },
        { $addToSet: { shipping: savedOrder.shipping } }
      );

      return res.status(201).send(savedOrder);
    }
    return res.status(404).send("Error: the order has not been created.");
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_CREATE_ITEMS");
  }
};

const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const  body  = req.body;
    console.log(body)
    const data = await orderModel.findByIdAndUpdate(id, body).populate("buyer");
    if(data && body.statusPurchase === 'order shipped'){
      transporter.sendMail(emailShipping(data.buyer,data));
    };
    if(data && body.statusPurchase === 'order cancelled' || body.statusPay === 'cancelled'){
      transporter.sendMail(emailOrderCancelled(data.buyer,data));
    };
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_ITEMS");
  }
};

const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;
    const deleteResponse = await orderModel.findByIdAndRemove({ _id: id });
    const data = {
      deleted: deleteResponse.matchedCount,
    };

    res.send({ data });
  } catch (e) {
    console.log(e);
    handleHttpError(res, "ERROR_DELETE_ITEM");
  }
};

//relacionado a order
const purchaseEmail = async (req, res) => {
  const { idUser } = req.params;
  const data = req.body;
  try {
    const user = await userModel.findOne({ _id: idUser });
    if (data.status === "approved") {
      transporter.sendMail(emailOrder(user, data));
      res.send("El email se mando correctamente");
    }
  } catch (err) {
    console.log(err);
    handleHttpError(res, "ERROR_PURCHASE_EMAIL");
  }
};

module.exports = {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem,
  purchaseEmail,
  getUserOrders,
};
