import e from "express";

export const errorHandler = (err, req, res, next) => {
  let messages = {};
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  if (err.name === "ValidationError") {
    const errors = Object.values(err.errors).map(
      (el) => (messages[el.path] = el.message)
    );

    res.status(statusCode).json({
      message: messages,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  if (err.name === "JsonWebTokenError") {
    const message = "Your token has expired! Please log in again.";
    res.status(statusCode).json({
      message: messages,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
  if (err.name === "TokenExpiredError") {
    const message = "Invalid token. Please log in again!.";
    res.status(statusCode).json({
      message: messages,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  } else if (err.code === 11000) {
    const message = `This email is in use, Please use another value!`;
    messages["email"] = message;
    res.status(statusCode).json({
      message: messages,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  } else {
    res.status(statusCode).json({
      message: err.message,
      stack: process.env.NODE_ENV === "development" ? err.stack : null,
    });
  }
};
