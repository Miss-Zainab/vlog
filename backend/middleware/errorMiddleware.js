const errorMiddleware = (err, req, res, next) => {
  console.error(err.message);

  // body-parser errors (e.g. invalid JSON) carry their own status code
  const statusCode =
    err.status || err.statusCode || (res.statusCode >= 400 ? res.statusCode : 500);

  res.status(statusCode).json({
    message:
      statusCode === 400 && err.type === "entity.parse.failed"
        ? "Invalid JSON in request body"
        : err.message || "Internal Server Error",
  });
};

module.exports = errorMiddleware;
