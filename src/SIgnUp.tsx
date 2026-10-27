
import React, { type SubmitEvent, useState } from "react";

// @ts-expect-error CSS files are handled by the bundler and have no TypeScript declarations.
import "./SignUp.css";

const SIGNUP_API_URL = process.env.REACT_APP_SIGNUP_URL;

const SignUp: React.FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const [error, setError] = useState<string>("");
    const [success, setSuccess] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [showConfirmPassword, setShowConfirmPassword] =
        useState<boolean>(false);

    const handleSubmit = async (
        e: SubmitEvent<HTMLFormElement>
    ) => {
        e.preventDefault();
        setError("");
        setSuccess("");

        if (
            !firstName.trim() ||
            !lastName.trim() ||
            !email.trim() ||
            !password ||
            !confirmPassword
        ) {
            setError("Please fill in all fields.");
            return;
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters long.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (!SIGNUP_API_URL) {
            setError(
                "Registration service is unavailable. Please try again later."
            );
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch(SIGNUP_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    firstName: firstName.trim(),
                    lastName: lastName.trim(),
                    email: email.trim(),
                    password: password,
                }),
            });

            const data = await response.json().catch(() => ({}));

            if (!response.ok) {
                setError(
                    data.message || "Unable to create your account."
                );
                return;
            }

            setSuccess(
                data.message ||
                    "Account created successfully! You can now sign in."
            );

            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
        } catch {
            setError(
                "An error occurred during sign-up. Please try again."
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="signup-container">
            <form
                className="signup-form"
                onSubmit={handleSubmit}
            >
                <h1>Create Account</h1>
                <p>
                    Welcome! Create an account to get started.
                </p>

                {error && (
                    <div
                        className="error-message"
                        role="alert"
                    >
                        {error}
                    </div>
                )}

                {success && (
                    <div
                        className="success-message"
                        role="status"
                    >
                        {success}
                        {" "}
                        <a href="/signin">Sign in</a>
                    </div>
                )}

                <div className="form-group">
                    <label htmlFor="firstName">
                        First name
                    </label>
                    <input
                        id="firstName"
                        type="text"
                        placeholder="Enter your first name"
                        value={firstName}
                        onChange={(e) =>
                            setFirstName(e.target.value)
                        }
                        autoComplete="given-name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="lastName">
                        Last name
                    </label>
                    <input
                        id="lastName"
                        type="text"
                        placeholder="Enter your last name"
                        value={lastName}
                        onChange={(e) =>
                            setLastName(e.target.value)
                        }
                        autoComplete="family-name"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="email">
                        Email address
                    </label>
                    <input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        autoComplete="email"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">
                        Password
                    </label>

                    <div className="password-input">
                        <input
                            id="password"
                            type={
                                showPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="At least 8 characters"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowPassword((prev) => !prev)
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

                <div className="form-group">
                    <label htmlFor="confirmPassword">
                        Confirm password
                    </label>

                    <div className="password-input">
                        <input
                            id="confirmPassword"
                            type={
                                showConfirmPassword
                                    ? "text"
                                    : "password"
                            }
                            placeholder="Re-enter your password"
                            value={confirmPassword}
                            onChange={(e) =>
                                setConfirmPassword(e.target.value)
                            }
                            autoComplete="new-password"
                            minLength={8}
                            required
                        />

                        <button
                            type="button"
                            onClick={() =>
                                setShowConfirmPassword(
                                    (prev) => !prev
                                )
                            }
                            aria-label={
                                showConfirmPassword
                                    ? "Hide confirm password"
                                    : "Show confirm password"
                            }
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="signup-button"
                    disabled={isLoading}
                >
                    {isLoading
                        ? "Creating account..."
                        : "Sign Up"}
                </button>

                <p className="signin-link">
                    Already have an account?{" "}
                    <a href="/signin">Sign in</a>
                </p>
            </form>
        </div>
    );
};

export default SignUp;
