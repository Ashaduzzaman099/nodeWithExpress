import type { NextFunction, Request, Response } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import { config } from "../config";
import { pool } from "../db";

const auth = (...roles: any) => {

  return async (req: Request, res: Response, next: NextFunction) => {
    // console.log("This is protected route!");
    // console.log(req.headers.authorization);
    const token = req.headers.authorization;
    if (!token) {
      res.status(401).json({
        success: false,
        message: "User UnAuthorized Access!!",
      });
    }
    const decode = jwt.verify(token as string, config.jwt_secret) as JwtPayload;
    const user = await pool.query(
      `
      SELECT * FROM users WHERE email = $1
    `,
      [decode.email],
    );
    console.log(user.rows[0]);
    if (user.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "User not Found !!",
      });
    }
    if (!user.rows[0].is_acitve) {
      res.status(403).json({
        success: false,
        message: "Forbidden !!",
      });
    }

    if (roles.length > 0 && !roles.includes(user.rows[0].role)) {
        res.status(403).json({
          success: false,
          message: "Forbidden! You do not have permission to access this resource.",
        });
      }
    console.log(decode.role)

    req.user = decode;

    next();
  };
};

export default auth;
