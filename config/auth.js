const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

//to hide password using hash
const hashPassword = async (password) => {
  //based on document of bcrypt
  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);
  return hash;
};

//compare both passwords
const hashCompare = (password, hash) => {
  return bcrypt.compare(password, hash);
};

//jwt(json web token) use to create token for authentication and session time
const createToken = ({ firstName, lastName, email, role }) => {
  let token = jwt.sign(
    { firstName, lastName, email, role },
    process.env.SECRET_KEY,
    {
      expiresIn: process.env.EXPIRE,
    }
  );
  return token;
}

//forget password validation token
const forgetPasswordToken = ({ firstName, lastName, email }) => {
  let token = jwt.sign(
    { firstName, lastName, email },
    process.env.SECRET_KEY_RESET,
    {
      expiresIn: process.env.EXPIRE,
    }
  );
  return token;
};

//decode token
const decodeToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

//decode forget password token
const decodePasswordToken = (token) => {
  let data = jwt.decode(token);
  return data;
};

//validation
const validate = async (req, res, next) => {
  try {
    if (req.headers.authorization) {
      let token = req.headers.authorization.split(" ")[1];
      let data = decodeToken(token);

      if (Math.floor(Date.now() / 1000) <= data.exp) {
        next();
      } else {
        res.status(401).send({
          message: "Token Expired",
        });
      }
    } else {
      res.status(401).send({
        message: "Token Not Found",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  hashPassword,
  hashCompare,
  createToken,
  decodeToken,
  validate,
  forgetPasswordToken,
  decodePasswordToken,
};
