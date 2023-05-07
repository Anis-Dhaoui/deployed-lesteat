var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('*', (req, res) => {
  // res.sendFile(path.join(__dirname, '../../client/build/index.html'));
  res.sendFile(path.join(__dirname, 'https://letseat-z2qv.onrender.com/index.html'));
  res.redirect('https://letseat-z2qv.onrender.com/index.html')
});

module.exports = router;
