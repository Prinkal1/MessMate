import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Bill = () => {
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const response = await axios.get('/api/bill/view');
        setBill(response.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBill();
  }, []);

  return (
    <div>
      <h1>Bill</h1>
      {bill ? (
        <div>
          <p>Total Amount: {bill.totalAmount}</p>
          <p>Monthly Amount: {bill.monthlyAmount}</p>
          <p>Extra Amount: {bill.extraAmount}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Bill;
