const Log = require("../models/mongo/logs/log-model");

const generateLogReqRes = () => {
  return async (req, res, next) => {
    // Capture the response data
    const oldSend = res.send;
    res.send = function (body) {
      // Save log data to MongoDB
      const log = new Log({
        ip: req.ip,
        method: req.method,
        path: req.path,
        requestBody: req.body,
        responseBody: body,
      });

      log.save().catch((err) => {
        console.error("Error saving log to MongoDB:", err);
      });

      // Send the original response
      oldSend.apply(res, arguments);
    };

    next();
  };
};

module.exports = generateLogReqRes;

// const fs = require("fs");

// const generateLogReqRes = (fileName) => {
//   return (req, res, next) => {
//     const originalSend = res.send;
//     let responseBody;

//     res.send = function (body) {
//       responseBody = body;
//       return originalSend.apply(this, arguments);
//     };

//     res.on("finish", () => {
//       const logEntry = `
//   Time: ${new Date().toISOString()}
//   IP: ${req.ip}
//   Method: ${req.method}
//   Path: ${req.path}
//   Request Body: ${JSON.stringify(req.body, null, 2)}
//   Response Body: ${JSON.stringify(JSON.parse(responseBody), null, 2)}
// `;

//       fs.appendFile(fileName, logEntry, (error) => {
//         if (error) {
//           console.error("Error writing log:", error);
//         }
//       });
//     });

//     next();
//   };
// };

// module.exports = generateLogReqRes;
