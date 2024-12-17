import express, { Request, Response } from 'express';
import { verifyToken } from '../api/auth';
import supabase from "../config/config";
import { BudgetController } from '../controllers/BudgetController';

const router = express.Router();

router.post('/', verifyToken, async (req: Request, res: Response) => {
  const totalAllcation = req.body.totalAllcation;
  

  if (!totalAllcation) {
    res.status(400).json({ error: 'User ID not found in request' });
    return;
  }

  try {
    const { data, error } = await supabase
      BudgetController.createBudget();

    if (error) {
      console.error('Error saving budget allocation:', error.message);
      res.status(500).json({ error: 'Failed to save budget allocation' });
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