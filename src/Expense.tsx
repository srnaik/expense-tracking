
 import React from "react";

 interface ExpenseProps {
    onBack: () => void;
}
 
 const Expense: React.FC<ExpenseProps> = ({ onBack }) => {

    return (
        <div className="expense-container">
            <h2>Expense Management</h2>
            <p>Track and manage your expenses effectively.</p>
            <button
                type="button"
                className="action-button"
                onClick={onBack}
            >
                Back to Dashboard
            </button>
        </div>
    )
};

export default Expense;