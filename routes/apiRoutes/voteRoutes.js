const express = require('express');
const { isBuffer } = require('util');
const router = express.Router();
const db = require('../../db/connection');
const inputCheck = require('../../inputCheck');

router.get('/votes', (req, res) => {
  const sql = `SELECT * FROM votes`;

  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows
    });
  });
});

router.post('/vote', ({ body }, res) => {
  // DATA validation
  const errors = inputCheck(body, 'voter_id', 'candidate_id');
  if (errors) {
    res.status(400).json({ error: errors });
    return;
  }

  const sql = `INSERT INTO votes (voter_id, candidated_id) VALUE (?,?)`;
  const params = [body.voter_id, body.candidate_id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'success',
      data: body,
      changes: result.affectedRows
    });
  });
});

module.exports = router;