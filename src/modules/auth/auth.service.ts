import bcrypt from "bcryptjs";
import { config } from "../../config";
import { pool } from "../../db";
import jwt from 'jsonwebtoken';

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
    role: user.rows[0].role,
  };
  delete user.rows[0].password;
  const accessToken = jwt.sign(JwtPayload, config.jwt_secret, {
    expiresIn: "1d",
  });
  return { accessToken, user: user.rows[0] };
};

export const authService = {
  loginUserIntoDB,
};
