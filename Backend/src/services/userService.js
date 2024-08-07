const { db } = require("../config/sqlDbConfig");

// Validate user credentials
const validateUserCredentials = (username, password, callback) => {
  const sql = `SELECT * FROM Users WHERE username = '${username}' OR email = '${username}' AND password = '${password}'`;
  db.query(sql, (err, results) => {
    if (err) {
      callback(err, null);
      return;
    }
    if (results.length === 0) {
      callback(null, null);
      return;
    }
    callback(null, results[0]);
  });
};

module.exports = { validateUserCredentials };
