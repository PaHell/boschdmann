const db = require("./db")

module.exports.getUsers = (req, res) => {
    db.query(
        `SELECT * FROM users;`
    )
    .then(result => res.json(result))
    .catch(error => res.json(error))
}