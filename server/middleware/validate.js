import Joi from "joi";

const validate = (schema, req, res, next) => {
  const options = {
    abortEarly: true,
    stripUnknown: true,
  };
  const { error, value } = schema.validate(req.body, options);

  let message = "";

  if (error) {
    switch (error.details[0].path[0]) {
      case "email":
        message = "Neteisingai nurodytas el. pašto adresas";
        break;
      case "password":
        message = "Neteisingai nurodytas slaptažodis";
        break;
      default:
        message = "Neteisingai užpildyti laukeliai";
        break;
    }

    return res.status(500).send(message);
  }

  req.body = value;
  next();
};

export const registerValidator = (req, res, next) => {
  const schema = Joi.object({
    user_name: Joi.string().min(2).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(12).required(),
  });

  validate(schema, req, res, next);
};

export const loginValidator = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(4).max(12).required(),
  });

  validate(schema, req, res, next);
};

export default validate;
