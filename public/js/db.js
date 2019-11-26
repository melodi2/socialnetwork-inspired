const spicedPg = require("spiced-pg");
const db = spicedPg("postgres:postgres:postgres@localhost:5432/socialnetwork");

function titleCase(str) {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i][0].toUpperCase() + splitStr[i].slice(1).toLowerCase();
    }
    return splitStr.join(" ");
}

module.exports.addUser = function addUser(
    firstname,
    lastname,
    email,
    password
) {
    firstname = titleCase(firstname);
    lastname = titleCase(lastname);
    return db.query(
        "INSERT INTO users (firstname, lastname, email, password) VALUES ($1, $2, $3, $4) RETURNING id",
        [firstname, lastname, email, password]
    );
};
