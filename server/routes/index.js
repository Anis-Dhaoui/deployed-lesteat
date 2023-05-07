var express = require('express');
var router = express.Router();
var path = require('path');

/* GET home page. */
router.get('*', (req, res) => {
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  console.log(req.path)
  console.log(req.url)
  console.log(req.baseUrl);
  console.log(req.params);
  console.log("$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$")
  res.sendFile(path.join(__dirname, '../../client/build/index.html'));
});

module.exports = router;
