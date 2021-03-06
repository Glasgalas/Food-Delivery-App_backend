const Joi = require("joi");
const { Schema, model } = require("mongoose");

const codeRegexp = /^\d{10}$/;

const orderSchema = Schema(
  {
    number: {
      type: String,
      requiered: true,
    },
    name: {
      type: String,
      requiered: [true, "Name is required"],
    },
    email: {
      type: String,
      requiered: [true, "Email is required"],
    },
    phone: {
      type: String,
      requiered: [true, "Phone is required"],
    },
    address: {
      type: String,
      requiered: [true, "Address is required"],
    },
    products: {
      type: Array,
      requiered: true,
    },
    cartTotalQuantity: {
      type: Number,
      requiered: true,
    },
    cartTotalAmount: {
      type: Number,
      requiered: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const joiOrderSchema = Joi.object({
  number: Joi.string(),
  name: Joi.string()
    .min(3)
    .max(30)
    .message({
      "string.base": "The name field must consist of at least 3 letters",
    })
    .required(),
  email: Joi.string()
    .required()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "ua"] },
    })
    .message({
      "string.base": "Invalid mail",
    }),
  phone: Joi.string().required().pattern(codeRegexp).messages({
    "string.pattern.base":
      "Phone number fails to match the required pattern: 0968981234",
  }),
  address: Joi.string()
    .min(3)
    .message({
      "string.base": "The address field must consist of at least 3 letters",
    })
    .required(),
  products: Joi.array().required(),
  cartTotalQuantity: Joi.number().required(),
  cartTotalAmount: Joi.number().required(),
});

const Order = model("order", orderSchema);

module.exports = { Order, joiOrderSchema };
