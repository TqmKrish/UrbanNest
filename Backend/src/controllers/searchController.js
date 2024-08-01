const { db } = require("../config/dbConfig");

const initiateAISearch = (req, res) => {
  console.log(req);
  generatePrompt(req, (prompt, err) => {
    if (err) {
      console.log(err);
      res.status(500).send({ message: "Something went wrong" });
      return;
    }
    if (prompt) {
      initiateSearch(prompt, (data, err) => {
        if (err) {
          console.log(err);
          res.status(500).send({ message: "Something went wrong" });
          return;
        }
        console.log(data);
        return;
      });
    }
  });
};

module.exports = { initiateAISearch };
