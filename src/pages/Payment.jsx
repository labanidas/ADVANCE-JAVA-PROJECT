import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "https://checkout.razorpay.com/v1/checkout.js";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const [razorpayOrderDetails, setRazorpayOrderDetails] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    // Fetch data from the servlet
    const fetchRazoroayOrder = async () => {
      const apiUrl = `${BASE_URL}/PaymentHandler?product_id=${product.id}`;

      try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
  
      // Check for HTTP errors
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }
  
      const JSONresponse = await response.json();
      setRazorpayOrderDetails(JSONresponse);
  
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred. Please try again later.");
    }
    };
    fetchRazoroayOrder();
  }, []);


  const handlepayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_hvkuFk2j7mbLvi", 
      amount: razorpayOrderDetails.amount, // Amount in paise
      currency: "INR",
      name: "MedAccess",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: razorpayOrderDetails.id, // Pass the obtained Order ID
      handler: function (response){
        // payment success 
        alert("Thank You");
      },
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
    rzp1.on('payment.failed', function (response){
      // payment failed
      // navigate Proceed to the payment page 
      navigate("/payment", { state: { product } });
    });
    rzp1.open();
  };

  return (
    <div>
      <h1>Payment Page</h1>
      
        <div>
          <p>Product Name: {product.name}</p>
          <p>Amount: {razorpayOrderDetails.amount / 100} INR</p>
        </div>
      
        <p>No product details available.</p>
      

      <button onClick={handlepayment} className="border border-blue-500">
        Pay with Razorpay
      </button>
    </div>
  );
};

export default Payment;
