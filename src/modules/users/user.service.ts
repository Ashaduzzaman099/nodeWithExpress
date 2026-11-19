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

const updateUserFromDB = async (payLoad: any, payload: Iuser) => {
  const { id } = payLoad;
  const { name, password, age, is_acitve } = payload;

  const result = await pool.query(
    `
        UPDATE users SET
        name = COALESCE($1, name),
        password = COALESCE($2, password),
        age = COALESCE($3, age),
        is_acitve = COALESCE($4, is_acitve),
        updated_at = NOW()
        WHERE id = $5 RETURNING *
      `,
    [name ?? null, password ?? null, age ?? null, is_acitve ?? null, id],
  );
  return result;
};

const deleteUserFromDB = async (payLoad: any) => {
  const { id } = payLoad;
  const result = await pool.query(
    `
        DELETE FROM users WHERE id = $1
      `,
    [id],
  );
  return result;
};

export const userService = {
  createUserIntoDB,
  getAllUserFromDB,
  getSingleUserFromDB,
  updateUserFromDB,
  deleteUserFromDB,
};
