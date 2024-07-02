import jwt from "jsonwebtoken";

export const createToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET);

  return token;
};
