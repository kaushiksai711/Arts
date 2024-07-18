import React, { useState } from 'react';
import axios from 'axios';
import { useLocation,useNavigate} from 'react-router-dom';

const apiUrl="http://localhost:5000"
function Payment() {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const totalAmount = queryParams.get('total');
    const orderId = queryParams.get('orderId');
    const email = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')).email : '';
    const [message, setMessage] = useState('');
    const [paymentCompleted, setPaymentCompleted] = useState(false);
    const navigate=useNavigate()
    const handlePay = async () => {
        try {
            const response = await axios.put(`${apiUrl}/api/payment/${orderId}`);

            if (response.status === 200) {
                setMessage('Order has been successfully placed and paid.');
                setPaymentCompleted(true);
                // You can perform additional actions here after successful payment
            } else {
                setMessage('Error placing order');
            }
        } catch (error) {
            console.error('Error placing order:', error);
            setMessage('Error placing order');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h2 className="mb-4">Payment Summary</h2>
                            <p>Total Amount: Rs. {totalAmount}</p>
                            {!paymentCompleted && (
                                <button className="btn btn-primary mt-3" onClick={handlePay}>
                                    Pay Now
                                </button>
                            )}
                            {message && <div className="alert alert-info mt-3">{message}</div>}
                        </div>
                    </div>
                </div>
            </div>
            {paymentCompleted && (
                <div className="row mt-3">
                    <div className="col-md-6">
                        <div className="card1">
                            <p>Thank you for your purchase!</p>
                            <p>Your order will be visible in the dashboard.</p>
                        
                        <button className="btn btn-primary" onClick={() =>  
    navigate(`/${email}/dashboard`)}>
                            Go to Dashboard
                        </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Payment;
