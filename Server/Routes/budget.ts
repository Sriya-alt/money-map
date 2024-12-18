import express, { Request, Response } from 'express';
import { verifyToken } from '../api/auth';
import { BudgetController } from '../controllers/BudgetController';

const router = express.Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const userID = req.userID;
  const budget = req.body;

  if (!userID) {
    res.status(400).json({ error: 'User ID not found in request' });
    return;
  }

  if (!budget) {
    res.status(400).json({ error: 'Total allocation not provided' });
    return;
  }

  try {
    console.log('Creating budget for user:', budget);
    const result = await BudgetController.createBudget(userID, budget.totalAllocation);

    if (!result.success) {
      res.status(500).json({ error: result.error });
      return;
    }

    res.status(200).json({ message: 'Budget allocation saved successfully' });
  } catch (error) {
    if (error instanceof Error) {
      console.error('Server error:', error.message);
    } else {
      console.error('Server error:', error);
    }
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;