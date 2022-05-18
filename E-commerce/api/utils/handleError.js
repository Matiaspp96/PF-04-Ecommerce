const handleHttpError = (res, message = "something happen", code = 403) => {
    res.status(code);
    res.send({ error: message });
  };
  
  module.exports = { handleHttpError };