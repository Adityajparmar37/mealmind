const express = require('express');
const router = express.Router();
const { generate, getHistory, deletePlan } = require('../controllers/mealPlanController');

router.post('/generate', generate);
router.get('/history', getHistory);
router.delete('/:id', deletePlan);

module.exports = router;
