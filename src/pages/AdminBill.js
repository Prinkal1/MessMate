import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentBill.css';

const AdminBill = () => {
    const [searchParams, setSearchParams] = useState({
        month: '',
        year: new Date().getFullYear()
    });
    const [billData, setBillData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const getMonthName = (monthNumber) => {
        const months = [
            'January', 'February', 'March', 'April',
            'May', 'June', 'July', 'August',
            'September', 'October', 'November', 'December'
        ];
        return months[parseInt(monthNumber) - 1] || '';
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSearchParams(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const fetchBill = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await axios.get(
                `http://localhost:4000/bill/fetchBill/${searchParams.month}/${searchParams.year}`
            );

            if (response.data.success) {
                setBillData(response.data.bill);
                toast.success('Bill fetched successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored"
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch bill', {
                position: "top-right",
                autoClose: 3000,
                theme: "colored"
            });
            setBillData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="view-bill-container bg-richblack-900">
            <div className="search-card">
                <h1 className="page-title">View Monthly Bill</h1>
                
                <form onSubmit={fetchBill} className="search-form">
                    <div className="search-inputs">
                        <div className="form-group">
                            <label>Month</label>
                            <select 
                                name="month" 
                                value={searchParams.month} 
                                onChange={handleChange}
                                required
                                className="form-control"
                            >
                                <option value="">Select Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label>Year</label>
                            <input
                                type="number"
                                name="year"
                                value={searchParams.year}
                                onChange={handleChange}
                                required
                                min="2000"
                                max="2100"
                                className="form-control"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="search-btn"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Fetching...' : 'Fetch Bill'}
                        </button>
                    </div>
                </form>

                {billData && (
                    <div className="bill-details">
                        <h2 className="bill-month">
                            Bill Details for {getMonthName(billData.month)} {billData.year}
                        </h2>
                        
                        <div className="expense-cards">
                            <div className="expense-card total">
                                <h3>Total Expense</h3>
                                <p>₹{billData.totalExpense.toFixed(2)}</p>
                            </div>
                            
                            <div className="expense-card">
                                <h3>Per Student Cost</h3>
                                <p>₹{billData.perStudentCost.toFixed(2)}</p>
                            </div>
                            
                            <div className="expense-card">
                                <h3>Total Students</h3>
                                <p>{billData.totalStudents}</p>
                            </div>
                        </div>

                        <div className="expenses-breakdown">
                            <h3>Expenses Breakdown</h3>
                            <div className="breakdown-grid">
                                <div className="breakdown-item">
                                    <span>Grocery</span>
                                    <span>₹{billData.expenses.grocery.toFixed(2)}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>Milk</span>
                                    <span>₹{billData.expenses.milk.toFixed(2)}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>Vegetables</span>
                                    <span>₹{billData.expenses.vegetables.toFixed(2)}</span>
                                </div>
                                <div className="breakdown-item">
                                    <span>Other Items</span>
                                    <span>₹{billData.expenses.otherItems.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminBill;