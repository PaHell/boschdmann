const mysql = require("mysql")

const pool = mysql.createPool({
    acquireTimeout: 5000,
    connectionLimit: 10,
    host: "localhost",
    port: 3306,
    user: "boschdmann",
    password: "thelaend",
    database: "boschdmann"
})

module.exports.query = (sql, args) => {
    return new Promise((resolve, reject) => {
        pool.query(sql, args, (error, results) => {
            if(error) reject(error.sqlMessage)
            resolve(results)
        })
    })
}
