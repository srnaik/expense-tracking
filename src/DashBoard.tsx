import React, { useState } from "react";
import { DashboardContext } from "./DashBoardContext";
// CSS is resolved by the bundler and does not have a TypeScript declaration.
// @ts-ignore
import './DashBoard.css';

type Tab = "spending" | "transactions" | "settings";

const DashBoard: React.FC = () => {
    const { userName } = React.useContext(DashboardContext);
    const [activeTab, setActiveTab] = useState<Tab>("spending");


    if(!userName) {
    throw new Error('Message component must be used within a UserContext.Provider');
  }

   return (
        <div className="dashboard-container">
            <header className="dffashboard-header">
                <div>
                    <h1>Welcome, {userName}!</h1>
                    <p>
                        Manage your finances all in one place.
                    </p>
                </div>
            </header>

            <nav className="dashboard-tabs" aria-label="Dashboard sections">
                <button
                    type="button"
                    className={`dashboard-tab ${
                        activeTab === "spending" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("spending")}
                    aria-current={activeTab === "spending" ? "page" : undefined}
                >
                    Spending
                </button>

                <button
                    type="button"
                    className={`dashboard-tab ${
                        activeTab === "transactions" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("transactions")}
                    aria-current={
                        activeTab === "transactions" ? "page" : undefined
                    }
                >
                    Transactions
                </button>

                <button
                    type="button"
                    className={`dashboard-tab ${
                        activeTab === "settings" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("settings")}
                    aria-current={activeTab === "settings" ? "page" : undefined}
                >
                    Settings
                </button>
            </nav>

            <main className="dashboard-content">
                {activeTab === "spending" && (
                    <section>
                        <h2>Spending Overview</h2>
                        <p>
                            View your spending habits and manage your budget.
                        </p>
                        <div className="dashboard-card">
                            <h3>Total Spending</h3>
                            <p className="placeholder-value">
                                No spending data available yet.
                            </p>
                        </div>
                    </section>
                )}

                {activeTab === "transactions" && (
                    <section>
                        <h2>Transactions</h2>
                        <p>
                            Review your recent payments and deposits.
                        </p>
                        <div className="dashboard-card">
                            <p>
                                Your transactions will appear here once
                                transaction data is connected.
                            </p>
                        </div>
                    </section>
                )}

                {activeTab === "settings" && (
                    <section>
                        <h2>Settings</h2>
                        <p>Manage your account preferences.</p>
                        <div className="dashboard-card">
                            <h3>Account Settings</h3>
                            <p>
                                Account preferences and profile options
                                will appear here.
                            </p>
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
};
export default DashBoard;
