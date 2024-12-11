import { Request, Response } from 'express';
import { Budget } from '../entities/Budget'; // Import the Budget model
import { getRepository } from 'typeorm';

export const createBudget = async (req: Request, res: Response) => {
  const { category, amount, timeframe, extraCategories } = req.body;

  // Basic validation for required fields
  if (!category || amount <= 0 || !['monthly', 'weekly'].includes(timeframe)) {
    return res.status(400).json({ message: 'Invalid input' });
  }

  try {
    const budgetRepository = getRepository(Budget);
    
    // Create a new budget entry
    const newBudget = budgetRepository.create({
      category,
      amount,
      timeframe,
      extraCategories: JSON.stringify(extraCategories)  // Store extraCategories as JSON
    });

    // Save the budget to the database
    await budgetRepository.save(newBudget);

    res.status(201).json(newBudget);
  } catch (error) {
    console.error('Error saving budget:', error);
    res.status(500).json({ message: 'Server error' });
  }
};