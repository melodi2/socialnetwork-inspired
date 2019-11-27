const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./public/js/db");
const bc = require("./public/js/bc");
const cookieSession = require("cookie-session");
const csurf = require("csurf");

app.use(compression());

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

app.get("*", function(req, res) {
    if (!req.session.userId) {
        res.redirect("/register");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.get("/register", function(req, res) {
    if (req.session.userId) {
        res.redirect("/");
    } else {
        res.sendFile(__dirname + "/index.html");
    }
});

app.post("/register", (req, res) => {
    let { first, last, email, pw } = req.body;

    if (first != "" && last != "" && email != "" && pw != "") {
        bc.hash(pw)
            .then(hashedPassword => {
                // console.log(first, last, email, hashedPassword);
                db.addUser(first, last, email, hashedPassword)
                    .then(({ rows }) => {
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
    let { pw, email } = req.body;
    if (pw != "" && email != "") {
        db.getUser(email)
            .then(({ rows }) => {
                bc.compare(pw, rows[0].password)
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
                res.render("login", {
                    layout: "main",
                    message:
                        "Your email or password is incorrect. Please try again.",
                    csrfToken: req.csrfToken()
                });
            });
    } else {
        res.render("login", {
            layout: "main",
            message: "Your email or password is incorrect. Please try again.",
            csrfToken: req.csrfToken()
        });
    }
});

app.listen(8080, function() {
    console.log("I'm listening.");
});
