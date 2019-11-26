const express = require("express");
const app = express();
const compression = require("compression");
const db = require("./js/db");
const bc = require("./js/bc");
const cookieSession = require("cookie-session");

app.use(compression());

app.use(express.static("./public"));
app.use(express.json());

app.use(
    cookieSession({
        secret: `I'm always angry.`,
        maxAge: 1000 * 60 * 60 * 24 * 14
    })
);

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
    let first = req.body.firstname;
    let last = req.body.lastname;
    let email = req.body.email;
    let pw = req.body.inputPassword;
    if (first != "" && last != "" && email != "" && pw != "") {
        bc.hash(pw)
            .then(hashedPassword => {
                // console.log(first, last, email, hashedPassword);
                // console.log(hashedPassword);
                db.addUser(first, last, email, hashedPassword)
                    .then(({ rows }) => {
                        if (req.session.sigId) {
                            req.session.sigId = null;
                        }
                        req.session.userId = rows[0].id;
                        res.redirect("/profile");
                    })
                    .catch(() => {
                        res.render("registration", {
                            layout: "main",
                            message: "Please fill out all required fields.",
                            csrfToken: req.csrfToken()
                        });
                    });
            })
            .catch(err => {
                console.log(err);
            });
    } else {
        res.render("registration", {
            layout: "main",
            message: "Please fill out all required fields.",
            csrfToken: req.csrfToken()
        });
    }
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
