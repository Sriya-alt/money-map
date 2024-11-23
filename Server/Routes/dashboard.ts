import express, { Request, Response } from 'express';
import { verifyToken } from '../api/auth';
import supabase from "../config/config";

const router = express.Router();

router.get('/', verifyToken, async (req: Request, res: Response) => {
  const userID = req.userID;
  if (!userID) {
    res.status(400).json({ error: 'User ID not found in request' });
    return;
  }

  try {
    const { data, error } = await supabase
      .from('dashboard')
      .select('account_no, balance, notifications')
      .eq('user_id', userID);

    if (error) {
      console.error('Error fetching dashboard data:', error);
      res.status(500).json({ error: 'Failed to fetch dashboard data' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;