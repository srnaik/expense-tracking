
import React, { type SubmitEvent, useState } from "react";
// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import './Expense.css';
import { useAuth } from "./AuthContext";

interface ExpenseProps {
    onBack: () => void;
}

interface ExpenseItem {
    id: number;
    date: string;
    amount: number;
    category: string;
    description: string;
}

interface Category {
    id: string;
    categoryName: string;
    type: string;
    icon: string;
    color: string;
}

const CATEGORIES_API_URL = process.env.REACT_APP_CATEGORIES_URL;
const Expense: React.FC<ExpenseProps> = ({ onBack }) => {

    const [expenses, setExpenses] = React.useState<ExpenseItem[]>([]);
    const [date, setDate] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('');
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [category, setCategory] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { user } = useAuth();

    React.useEffect(() => {
        if(user?.token) {
            fetchCategories();
        }
    }, [user?.token]);

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (date && amount > 0 && category) {
            const newExpense: ExpenseItem = {
                id: Date.now(),
                date,
                amount,
                category,
                description,
            };

            setExpenses((prev) => [...prev, newExpense]);
            setDate('');
            setAmount(0);
            setCategory('');
            setDescription('');
        }
    };

    const fetchCategories = async() => {

        if (!user?.token) {
            console.error("No authentication token available");
            return;
        }

        setIsLoading(true);
        setError('');

        try{

            if (!CATEGORIES_API_URL) {
                throw new Error('Categories API URL is not configured.');
            }

            const data = await fetch(CATEGORIES_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            console.log("Status:", data.status);


            if (!data.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categoriesData: Category[] = await data.json();
            const expenseCategories = categoriesData.filter((item) => item.type === "EXPENSE");
            setCategories(expenseCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddTransaction = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!user?.token) {
            console.error("No authentication token available");
            return;
        }

        if (!date || amount <= 0 || !category) {
            setError('Please fill in all required fields.');
            return;
        }
        
        const CREATE_TRANSACTION_URL = process.env.REACT_APP_CREATE_TRANSACTION_URL;

        if (!CREATE_TRANSACTION_URL) {
            console.error('Create Transaction API URL is not configured.');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const response = await fetch(CREATE_TRANSACTION_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
                body: JSON.stringify({
                    categoryId: category,
                    amount: amount,
                    currency: "USD", // Assuming USD for simplicity; adjust as needed
                    description: description,
                    transactionDate: new Date(date).toISOString(),
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(errorMessage || "Failed to add expense");
            }

            const data = await response.json();
            console.log('Expense saved successfully:', data);
            const selectedCategory = categories.find((item) => item.id === category);
            // Update expense history after successful API response
             const newExpense: ExpenseItem = {
                                    id: Date.now(),
                                    date,
                                    amount,
                                    category: selectedCategory ? selectedCategory.categoryName : "UNKNOWN",
                                    description: description.trim(),
                                }

            setExpenses((prev) => [...prev, newExpense]);

             // Reset form fields
            setDate("");
            setAmount(0);
            setCategory("");
            setDescription("");
        } catch (error) {
            console.error("Error creating transaction:", error);
            setError(error instanceof Error ? error.message: "Something went wrong while saving the expense.");
        }finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="expense-container">
            <h2>Expense Management</h2>
            <p>Track and manage your expenses effectively.</p>

            <form className="expense-form" onSubmit={handleAddTransaction}>

                <div className="expense-form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="expense-form-group">
                    <label htmlFor="amount">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        placeholder="Enter amount"
                        value={amount === 0 ? '' : amount}
                        onChange={(e) => setAmount(parseFloat(e.target.value) || 0)}
                        min="0.01"
                        step="0.01"
                        required
                    />
                </div>

                <div className="expense-form-group">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        disabled={isLoading || !!error}
                    >
                        <option value="">
                           {isLoading ? 'Loading categories...' : 'Select a category'}
                        </option>

                        {categories.map((item) => (
                            <option key={item.id} value={item.id}>
                                {item.categoryName}
                            </option>
                        ))}
                    </select>
                </div>

                 <div className="expense-form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="expense-action-button" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Expense'}
                </button>
            </form>

            <h3>Expense History</h3>

            {expenses.length === 0 ? (
                <p>No expenses recorded yet.</p>
            ) : (
                <table className="expense-history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.date}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{expense.category}</td>
                                <td>{expense.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                type="button"
                className="expense-action-button expense-back-button"
                onClick={onBack}
            >
                Back to Dashboard
            </button>
        </div>
    );
};

export default Expense;

