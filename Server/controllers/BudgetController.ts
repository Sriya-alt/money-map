import { Transaction, Budget } from "./types";
import supabase from "../config/config";

async function createBudget(userID: string, totalAllocation: number) {
    try {
        const { data, error } = await supabase.from('budget')
            .insert([
                {
                    id: userID,
                    budget: totalAllocation,
                    transactions: [],
                    address: ''
                }
            ]);

        if (error) {
            console.error('Error creating budget:', error);
            return { success: false, error: error.message };
        } else {
            console.log('Budget created successfully', data);
            return { success: true, data };
        }
    } catch (error) {
        console.error('Error creating budget:', error);
        return { success: false, error: 'Server error' };
    }
}

async function retrieveTransaction(
    userId: string,
    filters: Partial<Transaction>
) {
    try {
        const { data, error } = await supabase
            .from('budget')
            .select('transactions')
            .eq('user_id', userId)
            .single();

        if (error) {
            console.error('Error retrieving transactions:', error);
            return null;
        }

        // Ensure transactions is an array
        const transactions = Array.isArray(data?.transactions)
            ? (data.transactions as Transaction[])
            : [];

        // Filter transactions based on the provided criteria
        const filteredTransactions = transactions.filter((transaction) => {
            const matchesId = filters.transactionId
                ? transaction.transactionId === filters.transactionId
                : true;
            const matchesDate = filters.date ? transaction.date === filters.date : true;
            const matchesType = filters.type ? transaction.type === filters.type : true;

            return matchesId && matchesDate && matchesType;
        });

        return filteredTransactions.length > 0 ? filteredTransactions : null;
    } catch (err) {
        console.error('Error retrieving transaction:', err);
        return null;
    }
}

async function appendTransaction(userId: string, newTransaction: Transaction) {
    try {
        const { data: existingData, error: retrieveError } = await supabase
            .from('budget')
            .select('transactions')
            .eq('user_id', userId)
            .single();

        if (retrieveError) {
            console.error('Error retrieving current transactions:', retrieveError);
            return null;
        }

        const currentTransactions = Array.isArray(existingData?.transactions)
            ? (existingData.transactions as Transaction[])
            : [];

        // Append the new transaction
        const updatedTransactions = [...currentTransactions, newTransaction];

        // Update the database
        const { error: updateError } = await supabase
            .from('budget')
            .update({ transactions: updatedTransactions })
            .eq('user_id', userId);

        if (updateError) {
            console.error('Error updating transactions:', updateError);
            return null;
        }

        return updatedTransactions;
    } catch (err) {
        console.error('Error appending transaction:', err);
        return null;
    }
}

async function retrieveBudget(userId: string) {
    try {
        const { data, error } = await supabase.from('budget').select().eq('user_id', userId);
        if (error) {
            console.error('Error retrieving budget:', error);
            return null;
        } else {
            return data;
        }
    } catch (err) {
        console.error('Error retrieving budget:', err);
        return null;
    }
}

async function editBudget(userId: string, budget: Budget) {
    try {
        const { data, error } = await supabase.from('budget').update(budget).eq('user_id', userId);
        if (error) {
            console.error('Error updating budget:', error);
            return null;
        } else {
            console.log("Budget Updated ", data);
            return data;
        }
    } catch (err) {
        console.error('Error updating budget:', err);
        return null;
    }
}

export const BudgetController = {
    createBudget,
    retrieveBudget,
    retrieveTransaction,
    appendTransaction,
    editBudget
};