const handlerError = (err, req, resp, next) => {
  console.log("step 003 handle error");
  resp.status(err.statusCode || 500).json({ message: err.message || "Internal server error" });
};

module.exports = handlerError;
