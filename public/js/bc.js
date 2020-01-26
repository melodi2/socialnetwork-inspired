const bcrypt = require("bcryptjs");
const { promisify } = require("util");

const hash = promisify(bcrypt.hash);
const genSalt = promisify(bcrypt.genSalt);

//call in post registration route
exports.hash = password => genSalt().then(salt => hash(password, salt));

//call in post login route
exports.compare = promisify(bcrypt.compare); //return boolean value

//compare 2 arguments
//1.password user sends from the client (browser)
//2.the hashed pw from the database
