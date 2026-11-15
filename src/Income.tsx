import React, { type SubmitEvent, useEffect, useState } from "react";

// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import './Income.css';
import { useAuth } from "./AuthContext";

interface IncomeProps {
    onBack: () => void;
}

interface IncomeItem {
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


const Income: React.FC<IncomeProps> = ({ onBack }) => {

    const [incomes, setIncomes] = useState<IncomeItem[]>([]);
    const [date, setDate] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);
    const [description, setDescription] = useState<string>('');
    const [categories, setCategories] = useState<Category[]>([]);
    const [category, setCategory] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if(user?.token) {
            fetchCategories();
        }
    }, [user?.token]);

    const fetchCategories = async() => {

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

            if (!data.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categoriesData: Category[] = await data.json();
            const incomeCategories = categoriesData.filter((item) => item.type === "INCOME");
            setCategories(incomeCategories);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

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
                    throw new Error(errorMessage || "Failed to add income");
                }
    
                const data = await response.json();
                console.log('Income saved successfully:', data);
                const selectedCategory = categories.find((item) => item.id === category);
                // Update income history after successful API response
                 const newIncome: IncomeItem = {
                                        id: Date.now(),
                                        date,
                                        amount,
                                        category: selectedCategory ? selectedCategory.categoryName : "UNKNOWN",
                                        description: description.trim(),
                                    }
    
                setIncomes((prev) => [...prev, newIncome]);
    
                 // Reset form fields
                setDate("");
                setAmount(0);
                setCategory("");
                setDescription("");
            } catch (error) {
                console.error("Error creating transaction:", error);
                setError(error instanceof Error ? error.message: "Something went wrong while saving the income.");
            }finally {
                setIsLoading(false);
            }
        };

    return (
        <div className="income-container">
            <h2>Income Management</h2>
            <p>Track and manage your income effectively.</p>

            <form className="income-form" onSubmit={handleAddTransaction}>

                <div className="income-form-group">
                    <label htmlFor="date">Date</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>

                <div className="income-form-group">
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

                <div className="income-form-group">
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

                 <div className="income-form-group">
                    <label htmlFor="description">Description</label>
                    <input
                        type="text"
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="income-action-button" disabled={isLoading}>
                    {isLoading ? 'Saving...' : 'Save Income'}
                </button>
            </form>

            <h3>Income History</h3>

            {incomes.length === 0 ? (
                <p>No income recorded yet.</p>
            ) : (
                <table className="income-history-table">
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Category</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {incomes.map((income) => (
                            <tr key={income.id}>
                                <td>{income.date}</td>
                                <td>${income.amount.toFixed(2)}</td>
                                <td>{income.category}</td>
                                <td>{income.description}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            <button
                type="button"
                className="income-action-button income-back-button"
                onClick={onBack}
            >
                Back to Dashboard
            </button>
        </div>
    );

};

export default Income;