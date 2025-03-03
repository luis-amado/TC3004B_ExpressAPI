import { sqlConnect, sql } from '../utils/sql.js';

export const getItems = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool.request().query('SELECT * FROM items');
  res.json(data.recordset);
};

export const getItemById = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query('SELECT * FROM items WHERE id=@id');
  res.json(data.recordset);
};

export const postItem = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Int, req.body.price)
    .query(
      'INSERT INTO items (name, price) OUTPUT Inserted.* VALUES (@name, @price)'
    );
  res
    .status(200)
    .json({ message: 'Insert successful', item: data.recordset[0] });
};

export const putItem = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('name', sql.VarChar, req.body.name)
    .input('price', sql.Int, req.body.price)
    .input('id', sql.Int, req.params.id)
    .query('UPDATE items SET name=@name, price=@price WHERE id=@id');
  res.status(200).json({ message: 'Update successful' });
};

export const deleteItem = async (req, res) => {
  const pool = await sqlConnect();
  const data = await pool
    .request()
    .input('id', sql.Int, req.params.id)
    .query('DELETE FROM items WHERE id=@id');
  res.status(200).json({ message: 'Delete successful' });
};
