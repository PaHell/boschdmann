const db = require("./db")

module.exports.getUsers = (req, res) => {
    db.query(
        `SELECT users.ID AS UserID, users.FirstName, users.LastName, users.EMail, GROUP_CONCAT(departments.Name) AS Departments FROM users LEFT JOIN userdepartments ON users.ID = userdepartments.UserID LEFT JOIN departments ON userdepartments.DepartmentID = departments.ID GROUP BY users.ID;`
    )
    .then(result => res.json(result))
    .catch(error => res.json(error))
}
