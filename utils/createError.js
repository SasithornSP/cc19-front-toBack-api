const createError = (code, message) => {
  console.log("step1 create Error");
  const error = new Error(message);
  error.statusCode = code ;
  throw error
};

module.exports = createError;
