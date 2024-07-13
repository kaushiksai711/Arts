import React from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

function Payment() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const total = queryParams.get('total');

  const handlePayment = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/payment', {
        amount: total,
        currency: 'INR',
        receipt: 'order_rcptid_11'
      });

      const { order } = response.data;

      const options = {
        key: 'YOUR_RAZORPAY_KEY_ID', // Replace with your Razorpay key id
        amount: order.amount,
        currency: order.currency,
        name: 'Your Company Name',
        description: 'Test Transaction',
        order_id: order.id,
        handler: async (response) => {
          try {
            const result = await axios.post('http://localhost:5000/api/payment/verify', response);
            console.log(result.data);
            alert('Payment successful!');
          } catch (error) {
            console.error('Payment verification failed:', error);
            alert('Payment verification failed');
          }
        },
        prefill: {
          name: 'Your Name',
          email: 'your-email@example.com',
          contact: '9999999999'
        },
        notes: {
          address: 'Your Address'
        },
        theme: {
          color: '#F37254'
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.log('Error during payment: as backend is not implemented ');
      alert('Not Initialized');
    }
  };

  return (
    <div className="container mt-5" id='A'>
      <h2>Payment Gateway</h2>
      <p>Total Amount: ${total}</p>
      <button onClick={handlePayment} className="btn btn-primary mt-3">
        Pay with UPI
      </button>
    </div>
  );
}

export default Payment;
