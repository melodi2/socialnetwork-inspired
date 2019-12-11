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

module.exports.getUser = function getUser(email) {
    return db.query("SELECT password, id FROM users WHERE  email=$1", [email]);
};

module.exports.getInfo = function getInfo(id) {
    return db.query("SELECT * from users WHERE id=$1", [id]);
};

module.exports.addProfilePic = function addProfilePic(id, imageUrl) {
    return db.query("UPDATE users SET imgurl=$2 WHERE id=$1", [id, imageUrl]);
};

module.exports.addBio = function addBio(id, bio) {
    return db.query("UPDATE users SET bio=$2 WHERE id=$1", [id, bio]);
};

module.exports.findUser = function findUser(name) {
    return db.query(
        `SELECT * FROM users WHERE firstname ILIKE $1 OR lastname ILIKE $1 LIMIT 4;`,
        [name + "%"]
    );
};

module.exports.findRecentUser = function findRecentUser() {
    return db.query(`SELECT * FROM users ORDER BY id DESC LIMIT 4;`);
};

module.exports.checkFriendship = function checkFriendship(
    receiverId,
    senderId
) {
    return db.query(
        `SELECT * FROM friendships
    WHERE (receiver_id = $1 AND sender_id = $2)
    OR (receiver_id = $2 AND sender_id = $1);`,
        [receiverId, senderId]
    );
};

module.exports.sendFriendshipRequest = function sendFriendshipRequest(
    receiverId,
    senderId
) {
    return db.query(
        `INSERT INTO friendships (receiver_id, sender_id)
    VALUES ($1, $2);`,
        [receiverId, senderId]
    );
};

module.exports.endFriendshipRequest = function endFriendshipRequest(id) {
    return db.query(`DELETE FROM friendships WHERE id=$1;`, [id]);
};

module.exports.acceptFriendshipRequest = function acceptFriendshipRequest(id) {
    return db.query(`UPDATE friendships SET accepted = true WHERE id=$1;`, [
        id
    ]);
};

module.exports.checkFriends = function checkFriends(id) {
    return db.query(
        `
  SELECT users.id, firstname, lastname, imgurl, accepted
  FROM friendships
  JOIN users
  ON (accepted = false AND receiver_id = $1 AND sender_id = users.id)
  OR (accepted = true AND receiver_id = $1 AND sender_id = users.id)
  OR (accepted = true AND sender_id = $1 AND receiver_id = users.id) ORDER BY firstname
`,
        [id]
    );
};

module.exports.getMessages = function getMessages() {
    return db.query(
        "SELECT *, messages.id AS messages_id FROM messages LEFT JOIN users ON (sender_id = users.id) ORDER BY messages.id DESC LIMIT 10;"
    );
};

module.exports.addMessage = function addMessage(id, msg) {
    return db.query(
        "INSERT INTO messages (sender_id, msg) VALUES ($1, $2) RETURNING id;",
        [id, msg]
    );
};

//SELECT * FROM users WHERE id = ANY($1)
