
import React from "react";
// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import './Expense.css';

interface ExpenseProps {
    onBack: () => void;
}

interface ExpenseItem {
    id: number;
    date: string;
    amount: number;
    category: string;
}

const Expense: React.FC<ExpenseProps> = ({ onBack }) => {

    const [expenses, setExpenses] = React.useState<ExpenseItem[]>([]);
    const [date, setDate] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [category, setCategory] = React.useState<string>('');

    const handleAddExpense = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (date && amount > 0 && category) {
            const newExpense: ExpenseItem = {
                id: Date.now(),
                date,
                amount,
                category
            };

            setExpenses((prev) => [...prev, newExpense]);
            setDate('');
            setAmount(0);
            setCategory('');
        }
    };

    return (
        <div className="expense-container">
            <h2>Expense Management</h2>
            <p>Track and manage your expenses effectively.</p>

            <form onSubmit={handleAddExpense} className="expense-form">

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
                    >
                        <option value="">Select Category</option>
                        <option value="Food">Food</option>
                        <option value="Transportation">Transportation</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Entertainment">Entertainment</option>
                        <option value="Housing">Housing</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <button type="submit" className="expense-action-button">
                    Save Expense
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
                        </tr>
                    </thead>
                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td>{expense.date}</td>
                                <td>${expense.amount.toFixed(2)}</td>
                                <td>{expense.category}</td>
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
