import React from "react";
import { useLocation } from "react-router-dom";
import "https://checkout.razorpay.com/v1/checkout.js";

const Payment = () => {
  const location = useLocation();
  const { product, paymentDetails } = location.state ;
  console.log(product);  // Log to check the full structure of the product object


  const handlepayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_hvkuFk2j7mbLvi", 
      amount: paymentDetails.amount, // Amount in paise
      currency: "INR",
      name: "MedAccess",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: paymentDetails.id, // Pass the obtained Order ID
      callback_url: "/",
      prefill: {
        name: "XYZ",
        email: "XYZ@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new Razorpay(options);
    rzp1.open();
  };

  const buttonStyle = {
    backgroundColor: "#3399cc",
    color: "white",
    padding: "10px 20px",
    fontSize: "16px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  return (
    <div>
      <h1>Payment Page</h1>
      
        <div>
          <p>Product Name: {product.name}</p>
          <p>Amount: {paymentDetails.amount / 100} INR</p>
        </div>
      
        <p>No product details available.</p>
      

      <button style={buttonStyle} onClick={handlepayment}>
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
