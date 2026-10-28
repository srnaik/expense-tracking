import React, {type SubmitEvent, useState } from "react";
// @ts-expect-error CSS files are handled by the bundler and have no TypeScript declarations.
import './SignIn.css';
import { DashboardContext } from "./DashBoardContext";
import DashBoard from "./DashBoard";
import { useAuth, type AuthUser } from "./AuthContext";


const API_URL = process.env.REACT_APP_API_URL;

const SignIn: React.FC = () => {

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const { user, login } = useAuth();

    

    const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        if(!email.trim() || !password) {
            setError('Please enter both email and password');
            setIsLoading(false);
            return;
        }

        try{

            setIsLoading(true);

            if (!API_URL) {
                setError('Authentication service is unavailable. Please try again later.');
                return;
            }
           
            // Call Authenticationn API here
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify({ username: email.trim(),password: password,}),
            });

            if (!response.ok) {
                const errorData = await response.json();
                setError(errorData.message || 'Invalid email or password');
                setIsLoading(false);
                return;
            }

            const data: AuthUser = await response.json();
            login(data);
            console.log("API response:", data);
            console.log("First name:", data.firstName);
            // Handle successful sign-in (e.g., redirect, store token, etc.)
            setIsLoading(false);

        } catch (error) {
            setError('An error occurred during sign-in. Please try again.');
            setIsLoading(false);
        }finally {
            setIsLoading(false);
        }
    };

   
    if (user) {
        return (
            <DashboardContext.Provider value={{ userName: user.firstName }}>
                <DashBoard />
            </DashboardContext.Provider>
    );
}


    return (
        <div className="signin-container">
            <form className="signin-form" onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <p>Welcome back! Please sign in to your account.</p>

                {error && (
                    <div className="error-message" role="alert">
                        {error}
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>

                    <div className="password-input">
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                            aria-label={
                                showPassword
                                    ? "Hide password"
                                    : "Show password"
                            }
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <div className="signin-options">
                    <label>
                        <input type="checkbox" />
                        Remember me
                    </label>

                    <a href="/forgot-password">
                        Forgot password?
                    </a>
                </div>

                <button
                    type="submit"
                    className="signin-button"
                    disabled={isLoading}
                >
                    {isLoading ? "Signing in..." : "Sign In"}
                </button>

                <p className="signup-link">
                    Don't have an account?{" "}
                    <a href="/signup">Sign up</a>
                </p>
            </form>
        </div>
    );
};

export default SignIn;


