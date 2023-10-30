export const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    res
      .status(500)
      .json({ success: false, message: "username already exists", data: [] });
  }
  next(err);
};
