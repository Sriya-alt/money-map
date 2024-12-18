import express from 'express';
import { verifyToken } from '../api/auth';
import supabase from "../config/config";

const router = express.Router();

router.get('/', verifyToken, async (req, res) => {
  const userID = req.userID;
  try {
    const { data, error } = await supabase
      .from('account')
      .select('*')
      .eq('user_id', userID);

    if (error) {
      res.status(500).json({ error: 'Failed to fetch account data' });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;