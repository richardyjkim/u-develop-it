const express = require('express');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'rladudwp',
    database: 'election'
  },
  console.log('Connected to the election databases.')
);

app.get('/', (req, res) => {
  res.json({
    message: "Hi world"
  });
});

app.use((req, res) => {
  res.status(404).end();
});

db.query(`SELECT * FROM candidates`, (err, rows) => {
  console.log(rows);
});
// GET a single cadidate
db.query(`SELECT * FROM candidates WHERE id = 1`, (err, row) => {
  if (err) {
    console.log(err);
  }
  console.log(row);
});

// Delete a cadidate
db.query(`DELETE FROM candidates WHERE id = 1`, 1, (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result);
});

// Create a candidate
const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
              VALUE (?,?,?,?)`;
const params = [1, 'Ronald', 'Firbank', 1];

db.query(sql, params, (err, result)=>{
  if(err) {
    console.log(err);
  }
  console.log(result);
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});