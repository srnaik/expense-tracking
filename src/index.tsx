
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
// @ts-expect-error CSS files are handled by the bundler and have no TypeScript declarations.
import './index.css';
import reportWebVitals from './reportWebVitals';
import SignIn from './SignIn';
import SignUp from './SIgnUp';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />

                <Route
                    path="/"
                    element={<Navigate to="/signin" replace />}
                />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
);

reportWebVitals();

