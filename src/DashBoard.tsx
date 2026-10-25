import React from "react";
import { DashboardContext } from "./DashBoardContext";
// CSS is resolved by the bundler and does not have a TypeScript declaration.
// @ts-ignore
import './DashBoard.css';

const DashBoard: React.FC = () => {
    const { userName } = React.useContext(DashboardContext);

    if(!userName) {
    throw new Error('Message component must be used within a UserContext.Provider');
  }

   return (
        <div className="dashboard-container">
            <h1>Welcome, {userName}!</h1>
        </div>
    );
};
export default DashBoard;
