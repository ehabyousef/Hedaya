import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaCheckCircle } from "react-icons/fa";
import { fetchCart } from "../../redux/slices/cartSlice";
import "./SuccessPayment.css";

export default function SuccessPayment() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Refresh cart to reflect the cleared state after successful payment
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className="success-payment-container">
      <div className="success-payment-content">
        <div className="success-icon">
          <FaCheckCircle size={80} color="#28a745" />
        </div>
        <h1 className="success-title text-info">Payment Successful!</h1>
        <p className="success-message">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
        <div className="success-details">
          <p>
            <strong>What's next?</strong>
          </p>
          <ul>
            <li>You will receive an email confirmation shortly</li>
            <li>Your order will be prepared for shipping</li>
            <li>We will contact you with shipping details</li>
            <li>If you have questions, please contact our support team</li>
          </ul>
        </div>
        <div className="success-actions d-flex flex-column gap-3">
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Continue Shopping
          </button>
          <button
            className="btn btn-outline-secondary text-white"
            onClick={() => navigate("/contact")}
          >
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
}
