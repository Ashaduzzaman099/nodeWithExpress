import bcrypt from "bcryptjs";
import { config } from "../../config";
import { pool } from "../../db";
import jwt, { type JwtPayload } from 'jsonwebtoken';

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

  
  const accessToken = jwt.sign(JwtPayload, config.jwt_secret, {
    expiresIn: "1h",
  });
  const refreshToken = jwt.sign(JwtPayload, config.refresh_secret, {
    expiresIn: "10d",
  });
  return { accessToken, refreshToken, user: user.rows[0] };
};

const generateAccessToken = async (token: string) => {
  if (!token) {
    throw new Error("User UnAuthorized Access!!")
  }
  const decode = jwt.verify(
    token as string,
    config.refresh_secret,
  ) as JwtPayload;
  const user = await pool.query(
    `
      SELECT * FROM users WHERE email = $1
    `,
    [decode.email],
  );
  // console.log(user.rows[0]);
  if (user.rowCount === 0) {
    throw new Error("User not Found !!")
  }
  if (!user.rows[0].is_acitve) {
    throw new Error("Forbidden !!")
  }
  const JwtPayload = {
    id: user.rows[0].id,
    name: user.rows[0].name,
    email: user.rows[0].email,
    role: user.rows[0].role,
  };

  
  const accessToken = jwt.sign(JwtPayload, config.jwt_secret, {
    expiresIn: "1h",
  });
  return accessToken;
}

export const authService = {
  loginUserIntoDB,
  generateAccessToken,
};
