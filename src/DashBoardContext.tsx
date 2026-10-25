import React from "react";

interface DashboardContextType {
  userName: string;
}

export const DashboardContext = React.createContext<DashboardContextType>({
  userName: ''
});