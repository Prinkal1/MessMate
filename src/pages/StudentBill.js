import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './StudentBill.css';

const StudentBill = () => {
    const [searchParams, setSearchParams] = useState({
        month: '',
        year: new Date().getFullYear()
    });
    const [billData, setBillData] = useState(null);
    const [studentBillData, setStudentBillData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [attendance, setAttendance] = useState(null);

    // Get user ID from localStorage (assuming you store it during login)
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    
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

    const fetchStudentBill = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        console.log(searchParams, userId);

        try {
            // Fetch bill details
            const billResponse = await axios.get(
                `http://localhost:4000/bill/fetchBill/${searchParams.month}/${searchParams.year}`
            );

            if (billResponse.data.success) {
                setBillData(billResponse.data.bill);
                setStudentBillData({
                    totalBill: billResponse.data.bill.perStudentCost
                });

                toast.success('Bill details fetched successfully!', {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "colored"
                });
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch bill details', {
                position: "top-right",
                autoClose: 3000,
                theme: "colored"
            });
            setBillData(null);
            setStudentBillData(null);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="student-bill-container bg-richblack-900">
            <div className="bill-card mx-auto">
                <h1 className="page-title">My Monthly Mess Bill</h1>
                
                <form onSubmit={fetchStudentBill} className="search-form">
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
                                {/* Month options */}
                                {Array.from({ length: 12 }, (_, i) => {
                                    const month = (i + 1).toString().padStart(2, '0');
                                    return (
                                        <option key={month} value={month}>
                                            {getMonthName(month)}
                                        </option>
                                    );
                                })}
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
                            {isLoading ? 'Fetching...' : 'View My Bill'}
                        </button>
                    </div>
                </form>

                {billData && studentBillData && (
                    <div className="bill-details">
                        <h2 className="bill-month">
                            My Bill for {getMonthName(billData.month)} {billData.year}
                        </h2>
                        
                        <div className="student-bill-summary">
                            <div className="summary-card total">
                                <h3 className=''>My Total Bill</h3>
                                <p >₹{studentBillData.totalBill.toFixed(2)}</p>
                            </div>
                            
                            {/* <div className="summary-card">
                                <h3>Present Days</h3>
                                <p>{studentBillData.presentDays} days</p>
                            </div> */}
                            
                            {/* <div className="summary-card">
                                <h3>Daily Rate</h3>
                                <p>₹{billData.perStudentCost.toFixed(2)}</p>
                            </div> */}
                        </div>

                        <div className="mess-details">
                            <h3>Mess Details</h3>
                            <div className="details-grid">
                                {/* <div className="detail-item">
                                    <span>Total Mess Expense - </span>
                                    <span>₹{billData.totalExpense.toFixed(2)}</span>
                                </div>
                                <div className="detail-item">
                                    <span>Total Students</span>
                                    <span>{billData.totalStudents}</span>
                                </div> */}
                                <div className="breakdown-section mt-4">
                                    <h4 className='text-xl'>Expense Breakdown</h4>
                                    <div className="breakdown-items">
                                        <div className="breakdown-item">
                                            <span>Grocery</span>
                                            <span>₹{(billData.expenses.grocery / billData.totalStudents).toFixed(2)}</span>
                                        </div>
                                        <div className="breakdown-item">
                                            <span>Milk</span>
                                            <span>₹{(billData.expenses.milk / billData.totalStudents).toFixed(2)}</span>
                                        </div>
                                        <div className="breakdown-item">
                                            <span>Vegetables</span>
                                            <span>₹{(billData.expenses.vegetables / billData.totalStudents).toFixed(2)}</span>
                                        </div>
                                        <div className="breakdown-item">
                                            <span>Other Items</span>
                                            <span>₹{(billData.expenses.otherItems / billData.totalStudents).toFixed(2)}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default StudentBill;