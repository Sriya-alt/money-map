import express from 'express';
import { createBudget } from '../controllers/BudgetController1';

const router = express.Router();

router.post('/api/budgets', createBudget);

export default router;