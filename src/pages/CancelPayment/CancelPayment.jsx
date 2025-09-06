import { useNavigate } from "react-router-dom";
import { FaTimesCircle } from "react-icons/fa";
import "./CancelPayment.css";

export default function CancelPayment() {
  const navigate = useNavigate();

  return (
    <div className="cancel-payment-container">
      <div className="cancel-payment-content">
        <div className="cancel-icon">
          <FaTimesCircle size={80} color="#dc3545" />
        </div>
        <h1 className="cancel-title">Payment Cancelled</h1>
        <p className="cancel-message">
          Your payment has been cancelled. No charges were made to your account.
        </p>
        <div className="cancel-details">
          <p>
            <strong>What happened?</strong>
          </p>
          <ul>
            <li>You cancelled the payment process</li>
            <li>Your items are still in your cart</li>
            <li>You can try again or choose a different payment method</li>
          </ul>
        </div>
        <div className="cancel-actions">
          <button
            className="btn btn-primary me-3"
            onClick={() => navigate("/cart")}
          >
            Back to Cart
          </button>
          <button
            className="btn btn-outline-secondary text-white"
            onClick={() => navigate("/")}
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
