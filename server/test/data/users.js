const bcrypt = require("bcryptjs");
const { userTypes } = require("../../constants");

const users = [
  {
    name: "Admin User",
    email: "admin@mail.com",
    mobile: "6019700700",
    password: bcrypt.hashSync("123123", 10),
    userType: userTypes.admin,
    acceptedTNC: true,
  },
  {
    name: "John Doe",
    email: "john@mail.com",
    mobile: "60123213211",
    password: bcrypt.hashSync("123123", 10),
    acceptedTNC: true,
  },
  {
    name: "Jane Doe",
    email: "jane@mail.com",
    mobile: "601145645650",
    password: bcrypt.hashSync("123123", 10),
    acceptedTNC: true,
  },
];

module.exports = users;
