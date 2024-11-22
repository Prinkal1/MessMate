import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './AddBill.css';
import { Link } from 'react-router-dom';

const AddBill = () => {
    const [formData, setFormData] = useState({
        month: '',
        year: new Date().getFullYear(),
        expenses: {
            grocery: '',
            milk: '',
            vegetables: '',
            otherItems: ''
        }
    });

    const [isLoading, setIsLoading] = useState(false);

    // Helper function to get month name
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
        if (name in formData.expenses) {
            setFormData(prev => ({
                ...prev,
                expenses: {
                    ...prev.expenses,
                    [name]: parseFloat(value) || ''
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const calculateTotal = () => {
        const { grocery, milk, vegetables, otherItems } = formData.expenses;
        return (Number(grocery) || 0) + 
               (Number(milk) || 0) + 
               (Number(vegetables) || 0) + 
               (Number(otherItems) || 0);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Validate if all required fields are filled
        if (!formData.month || !formData.year || !formData.expenses.grocery || 
            !formData.expenses.milk || !formData.expenses.vegetables) {
            toast.error('Please fill all required fields', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setIsLoading(false);
            return;
        }

        try {
            const response = await axios.post('http://localhost:4000/bill/addBill', formData);
            if (response.data.success) {
                toast.success(`Bill for ${getMonthName(formData.month)} ${formData.year} added successfully! Total: ₹${calculateTotal().toFixed(2)}`, {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                    icon: "🎉"
                });

                // Reset form
                setFormData({
                    month: '',
                    year: new Date().getFullYear(),
                    expenses: {
                        grocery: '',
                        milk: '',
                        vegetables: '',
                        otherItems: ''
                    }
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to add bill. Please try again.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                icon: "❌"
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="add-bill-container bg-richblack-900">
            <div className="bill-card">
                    <Link to="/adminViewBill" className='flex ml-auto'>
                        <button  className="submit-btn ml-auto w-fit">
                            View Past Bills
                        </button>
                    </Link>
                <div className="header-section">
                    <h1 className="page-title">Add Monthly Bill</h1>
                </div>
                <form onSubmit={handleSubmit} className="bill-form">
                    <div className="date-section">
                        <div className="form-group">
                            <label>Month</label>
                            <select 
                                name="month" 
                                value={formData.month} 
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
                                value={formData.year}
                                onChange={handleChange}
                                required
                                min="2000"
                                max="2100"
                                className="form-control"
                            />
                        </div>
                    </div>

                    <div className="expenses-section">
                        <h2 className="section-title">Expenses Details</h2>
                        <div className="expenses-grid">
                            <div className="expense-item">
                                <label>Grocery</label>
                                <div className="input-with-icon">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        type="number"
                                        name="grocery"
                                        value={formData.expenses.grocery}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="form-control"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="expense-item">
                                <label>Milk</label>
                                <div className="input-with-icon">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        type="number"
                                        name="milk"
                                        value={formData.expenses.milk}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="form-control"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="expense-item">
                                <label>Vegetables</label>
                                <div className="input-with-icon">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        type="number"
                                        name="vegetables"
                                        value={formData.expenses.vegetables}
                                        onChange={handleChange}
                                        required
                                        min="0"
                                        className="form-control"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>

                            <div className="expense-item">
                                <label>Other Items</label>
                                <div className="input-with-icon">
                                    <span className="currency-symbol">₹</span>
                                    <input
                                        type="number"
                                        name="otherItems"
                                        value={formData.expenses.otherItems}
                                        onChange={handleChange}
                                        min="0"
                                        className="form-control"
                                        placeholder="0.00"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="total-section">
                            <div className="total-amount">
                                <span>Total Amount:</span>
                                <span className="amount">₹{calculateTotal().toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    <button 
                        type="submit" 
                        className="submit-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <span className="loading-text">Adding Bill...</span>
                        ) : (
                            <span>Add Bill</span>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddBill;