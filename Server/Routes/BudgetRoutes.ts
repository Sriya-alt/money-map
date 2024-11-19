import express from 'express';
import { createBudget } from '../controllers/budgetController';

const router = express.Router();

router.post('/api/budgets', createBudget);

export default router;