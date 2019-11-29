const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./public/js/db");
const bc = require("./public/js/bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");
const multer = require("multer");
const s3 = require("./s3");
const uidSafe = require("uid-safe");
const path = require("path");
const { s3Url } = require("./config");

app.use(compression());

const diskStorage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + "/uploads");
    },
    filename: function(req, file, callback) {
        uidSafe(24).then(function(uid) {
            callback(null, uid + path.extname(file.originalname));
        });
    }
});

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152
    }
});
app.use(express.static("./public"));
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

app.use(csurf());

app.use(function(req, res, next) {
    res.cookie("mytoken", req.csrfToken());
    next();
});

if (process.env.NODE_ENV != "production") {
    app.use(
        "/bundle.js",
        require("http-proxy-middleware")({
            target: "http://localhost:8081/"
        })
    );
} else {
    app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
}

app.get("/register", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    let { first, last, email, password } = req.body;

    if (first != "" && last != "" && email != "" && password != "") {
        bc.hash(password)
            .then(hashedPassword => {
                // console.log(first, last, email, hashedPassword);
                db.addUser(first, last, email, hashedPassword)
                    .then(({ rows }) => {
                        // console.log("rows", rows);
                        req.session.userId = rows[0].id;
                        res.json({
                            success: true
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            })
            .catch(err => {
                res.json({
                    success: false
                });
                console.log(err);
            });
    } else {
        console.log("error in post register");
    }
});

app.get("/login", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/login", (req, res) => {
    console.log("post login server");
    let { password, email } = req.body;
    if (password != "" && email != "") {
        db.getUser(email)
            .then(({ rows }) => {
                bc.compare(password, rows[0].password)
                    .then(val => {
                        if (val) {
                            req.session.userId = rows[0].id;
                            res.json({
                                success: true
                            });
                        } else {
                            res.json({
                                success: false
                            });
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        res.json({
                            success: false
                        });
                    });
            })
            .catch(err => {
                console.log("email or password is wrong", err);
                res.json({
                    success: false
                });
            });
    } else {
        res.json({
            success: false
        });
    }
});

app.get("/user", (req, res) => {
    if (req.session.userId) {
        db.getInfo(req.session.userId).then(({ rows }) => {
            res.json({
                first: rows[0].firstname,
                last: rows[0].lastname,
                imgurl: rows[0].imgurl,
                bio: rows[0].bio
            });
        });
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/upload", uploader.single("file"), s3.upload, (req, res) => {
    const imageUrl = `${s3Url}${req.file.filename}`;
    db.addProfilePic(req.session.userId, imageUrl)
        .then(() => {
            res.json({
                imgurl: imageUrl
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.post("/bio", (req, res) => {
    const { bio } = req.body;
    console.log("req.body", req.body, bio);
    db.addBio(req.session.userId, bio)
        .then(() => {
            console.log("in then req.body", req.body, bio);
            res.json({
                bio: bio
            });
        })
        .catch(err => {
            console.log(err);
        });
});

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
