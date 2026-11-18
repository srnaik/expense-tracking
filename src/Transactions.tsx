import React from "react";

// @ts-ignore TypeScript may not have a declaration for CSS side-effect imports.
import "./Transactions.css";

interface TransactionsProps {
  onBack: () => void;
}

const Transactions: React.FC<TransactionsProps> = ({ onBack }) => {
  const [filteredDuration, setFilteredDuration] = React.useState<string>("");
  const [filteredType, setFilteredType] = React.useState<string>("");
  const [filteredCategory, setFilteredCategory] = React.useState<string>("");

  return (
    <div className="transactions-container">
      <h2>Select Filter To View Transactions</h2>

      <div className="transactions-form-group">
        <div className="form-field">
          <label htmlFor="filteredDuration">Duration</label>
          <select
            id="filteredDuration"
            value={filteredDuration}
            onChange={(e) => setFilteredDuration(e.target.value)}
            required
          >
            <option value="">Select Duration</option>
            <option value="Daily">Daily</option>
            <option value="Weekly">Weekly</option>
            <option value="Bi-Weekly">Bi-Weekly</option>
            <option value="Monthly">Monthly</option>
            <option value="Quarterly">Quarterly</option>
            <option value="Half-Yearly">Half-Yearly</option>
            <option value="Yearly">Yearly</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="filteredType">Type</label>
          <select
            id="filteredType"
            value={filteredType}
            onChange={(e) => setFilteredType(e.target.value)}
            required
          >
            <option value="">Select Type</option>
            <option value="Expense">Expense</option>
            <option value="Income">Income</option>
          </select>
        </div>

        <div className="form-field">
          <label htmlFor="filteredCategory">Category</label>
          <select
            id="filteredCategory"
            value={filteredCategory}
            onChange={(e) => setFilteredCategory(e.target.value)}
            required
          >
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Salary">Salary</option>
          </select>
        </div>
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
