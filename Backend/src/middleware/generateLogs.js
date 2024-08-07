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
