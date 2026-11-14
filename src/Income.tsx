import React, { useEffect } from "react";
import { useAuth } from "./AuthContext";

interface IncomeProps {
    onBack: () => void;
}

interface IncomeItem {
    id: number;
    date: string;
    amount: number;
    source: string;
    description: string;
}

interface Category {
    id: string;
    categoryName: string;
    type: string;
    icon: string;
    color: string;
}
const CATEGORIES_API_URL = process.env.REACT_APP_CATEGORIES_URL;


const Income: React.FC<IncomeProps> = ({ onBack }) => {

    const [incomes, setIncomes] = React.useState<IncomeItem[]>([]);
    const [date, setDate] = React.useState<string>('');
    const [amount, setAmount] = React.useState<number>(0);
    const [description, setDescription] = React.useState<string>('');
    const [categories, setCategories] = React.useState<Category[]>([]);
    const [category, setCategory] = React.useState<string>('');
    const [error, setError] = React.useState<string>('');
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const { user } = useAuth();

    useEffect(() => {
        if(user?.token) {
            fetchCategories();
        }
    }, [user?.token]);

    const fetchCategories = async() => {

        setIsLoading(true);
        setError('');

        try{
            if (!CATEGORIES_API_URL) {
                throw new Error('Categories API URL is not configured.');
            }

            const data = await fetch(CATEGORIES_API_URL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    Authorization: `Bearer ${user?.token}`,
                },
            });

            if (!data.ok) {
                throw new Error('Failed to fetch categories');
            }

            const categoriesData = await data.json();
            setCategories(categoriesData);
        } catch (error) {
            console.error('Error fetching categories:', error);
            setError('Failed to load categories. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    }

    return (
    <div>
        <h1>Income Page</h1>
        {/* Add your income-related content here */}
        <button
                type="button"
                className="expense-action-button expense-back-button"
                onClick={onBack}
            >
                Back to Dashboard
            </button>
    </div>
);

};

export default Income;