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
    budget: Record<string, any>;
    transactions: Record<string, any>;
    address: Record<string, any>;
}