export const errorHandler = (err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    res.status(500).json({ suceess: false, error: "username already exists" });
  }
  next(err);
};
