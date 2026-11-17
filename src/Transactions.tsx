import React from "react";

// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import "./Transactions.css";

interface TransactionsProps {
  onBack: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ onBack }) => {
  const [filteredCategory, setFilteredCategory] = React.useState<string>("");

  return (
    <div className="transactions-container">
      <h2>Select Filter To View Transactions</h2>

      <div className="transactions-form-group">
        <label htmlFor="filteredCategory">Transaction Filter</label>

        <select
          id="filteredCategory"
          value={filteredCategory}
          onChange={(e) => setFilteredCategory(e.target.value)}
          required
        >
          <option value="">Select Filter</option>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
          <option value="Bi-Weekly">Bi-Weekly</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Half-Yearly">Half-Yearly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <button
        type="button"
        className="transactions-action-button transactions-back-button"
        onClick={onBack}
      >
        Back to Dashboard
      </button>
    </div>
  );
};

export default Transactions;
