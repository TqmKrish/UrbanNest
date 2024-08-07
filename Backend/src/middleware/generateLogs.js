const fs = require("fs");
const generateLogReqRes = (fileName) => {
  return (req, res, next) => {
    fs.appendFile(
      fileName,
      `\n${Date.now()}:${req.ip} ${req.method}: ${req.path}`,
      (error, data) => {
        next();
      }
    );
  };
};

module.exports = generateLogReqRes;
