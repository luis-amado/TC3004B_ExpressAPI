import { sqlConnect, sql } from '../utils/sql.js';

export const login = async (req, res) => {
  console.log(req.body);
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('username', sql.VarChar, req.body.username)
    .query('SELECT * FROM users WHERE username=@username');
  const isLogin = data.recordset[0]?.password === req.body.password;
  if (isLogin) {
    res.status(200).json({ isLogin, user: data.recordset[0] });
  } else {
    res.status(400).json({ isLogin, user: null });
  }
};
