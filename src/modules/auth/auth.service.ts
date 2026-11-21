import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { pool } from "../../db";

const loginUserIntoDB = async (payLoad: {
  email: string;
  password: string;
}) => {
  const { email, password } = payLoad;

  const user = await pool.query(
    `
      SELECT * FROM users WHERE email=$1
    `,
    [email],
  );

  if (user.rowCount === 0) {
    throw new Error("Invalid Credentials !!");
  }

  const passwordMatch = await bcrypt.compare(password, user.rows[0].password);
  if (!passwordMatch) {
    throw new Error("Invalid Credentials !!");
  }

  if (!user.rows[0].is_acitve) {
    throw new Error("Access Denied !!");
  }

  const JwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
  };
  delete user.rows[0].password;
  const accessToken = jwt.sign(JwtPayload, "dshdjsfjdfs", { expiresIn: "1d" });
  return { accessToken, user: user.rows[0] };
};

export const authService = {
  loginUserIntoDB,
};
