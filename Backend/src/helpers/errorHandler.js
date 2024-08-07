// Global error handler middleware
const errorHandler = (controllerAction) => {
  return async function (req, res) {
    try {
      await controllerAction(req, res);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ message: "Something went wrong, internal server error" });
    }
  };
};

module.exports = { errorHandler };
