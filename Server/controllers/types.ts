export interface UserUpdates {
    email?: string;
    password?: string;
    name?: string;
    phone?: string;
    dob?: Date;
}

export interface Transaction {
    date?: string; 
    type?: string; 
    cost?: number 
    transactionId?: string
}

export interface Budget {
    id: string;
    budget_allocation: number;
    total_budget: Record<string, number>;
    transactions: Record<string, number>;
    address: Record<string, string>;
}