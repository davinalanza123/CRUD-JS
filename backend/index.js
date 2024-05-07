const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test_db',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.get('/', (req, res) => {
  res.send('API is running');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Read (get all items)
app.get('/items', (req, res) => {
    db.query('SELECT * FROM items', (err, results) => {
      if (err) throw err;
      res.json(results);
    });
  });
  
  // Create (add new item)
  app.post('/items', (req, res) => {
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
  
  // Update (edit existing item)
  app.put('/items/:id', (req, res) => {
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
  
  // Delete (remove an item)
  app.delete('/items/:id', (req, res) => {
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
  