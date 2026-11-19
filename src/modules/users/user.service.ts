import { pool } from "../../db";
import type { Iuser } from "./user.interface";

const createUserIntoDB = async (payLoad: Iuser) => {
  const { name, email, password, age } = payLoad;

  const result = await pool.query(
    `
                INSERT INTO users (name, email, password,age) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, email, password, age],
  );

  // console.log(result);
  return result;
};

const getAllUserFromDB = async () => {
  const result = await pool.query(`SELECT * FROM users`);
  return result;
};

const getSingleUserFromDB = async (payLoad: any) => {
  const { id } = payLoad;
  const result = await pool.query(` SELECT * FROM users WHERE id = $1`, [id]);
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
};
