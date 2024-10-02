const express = require('express');
const router = express.Router();
import LibTask from '../lib/LibTask';

/*****************************
Task -index
******************************/
router.get('/index', async function(req: any, res: any) {
  try {
    const items = await LibTask.getItems();
console.log(items);
    res.json(items);
  } catch (error) {
    res.sendStatus(500);
  }
});

/*****************************
Task -add
******************************/
router.post('/add', async function(req: any, res: any) {
  try {
    const result = await LibTask.addTask(req);
//console.log(result);
    res.json(result);
  } catch (error) {
    res.sendStatus(500);
  }
});

export default router;