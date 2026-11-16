import React from "react";

// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import './Transactions.css';

interface TransactionsProps {
    onBack: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ onBack }) => {

    return (
        <div className="transactions-container">
            <h2>Transactions</h2>
            <p>Here you can view all your transactions.</p>
            <button
                type="button"
                className="transactions-action-button transactions-back-button"
                onClick={onBack}
            >
                Back to Dashboard
            </button>
        </div>
    );
}

export default Transactions;