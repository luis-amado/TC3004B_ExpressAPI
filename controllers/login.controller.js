import { sqlConnect, sql } from '../utils/sql.js';
import crypto from 'crypto';

export const login = async (req, res) => {
  const { username, password } = req.body;

  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('username', sql.VarChar, username)
    .query('SELECT * FROM users WHERE username=@username');

  const storedPassword = data.recordset[0]?.password;
  const salt = storedPassword.slice(0, 9);
  console.log(salt);

  const hashing = crypto.createHash('sha512');
  const hash = hashing
    .update(salt + process.env.PEPPER + password)
    .digest('base64url');

  const isLogin = storedPassword === salt + hash;
  if (isLogin) {
    res.status(200).json({ isLogin, user: data.recordset[0] });
  } else {
    res.status(400).json({ isLogin, user: null });
  }
};

export const register = async (req, res) => {
  const { username, password, name } = req.body;
  const salt = crypto.randomBytes(24).toString('base64url').slice(0, 9);
  console.log(salt);
  const pepperPassword = process.env.PEPPER + password;
  const saltedPassword = salt + pepperPassword;

  const hashing = crypto.createHash('sha512');
  const hash = hashing.update(saltedPassword).digest('base64url');

  const storedPassword = salt + hash;

  const pool = await sqlConnect();
  await pool
    .request()
    .input('username', sql.VarChar, username)
    .input('password', sql.VarChar, storedPassword)
    .input('name', sql.VarChar, name)
    .query(
      'INSERT INTO users (name, username, password) VALUES (@name, @username, @password)'
    );

  res.status(200).json({ message: 'Created user' });
};
