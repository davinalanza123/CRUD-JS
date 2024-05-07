const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Menghubungkan ke database
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'test_db',
});

// Read (mendapatkan semua item)
router.get('/', (req, res) => {
  db.query('SELECT * FROM items', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create (menambahkan item baru)
router.post('/', (req, res) => {
  const { name, description } = req.body;
  db.query(
    'INSERT INTO items (name, description) VALUES (?, ?)',
    [name, description],
    (err, results) => {
      if (err) throw err;
      res.json({ id: results.insertId, name, description });
    }
  );
});

// Update (memperbarui item)
router.put('/:id', (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;
  db.query(
    'UPDATE items SET name = ?, description = ? WHERE id = ?',
    [name, description, id],
    (err, results) => {
      if (err) throw err;
      res.json({ id, name, description });
    }
  );
});

// Delete (menghapus item)
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query(
    'DELETE FROM items WHERE id = ?',
    [id],
    (err, results) => {
      if (err) throw err;
      res.json({ message: 'Item deleted successfully' });
    }
  );
});

module.exports = router;
