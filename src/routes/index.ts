const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/test', function(req: any, res: any) {
  try {
    res.send({ name: "GET /test" });
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
