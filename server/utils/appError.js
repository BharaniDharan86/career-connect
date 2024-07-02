class AppError extends Error {
  constructor(error, statusCode, status) {
    super(error);
    this.status = status || "Failed";
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

export default AppError;
