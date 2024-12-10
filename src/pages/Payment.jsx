import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "https://checkout.razorpay.com/v1/checkout.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
      toast.error("An error occurred! Please try again");
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
        toast.success("Thank you so much!");;
        navigate("/products");
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
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
  <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
    <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
      Payment Page
    </h1>

    {product && razorpayOrderDetails ? (
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
        <p className="text-lg font-medium text-gray-700">
          <span className="font-semibold text-gray-900">Product Name:</span>{" "}
          {product.name}
        </p>
        <p className="text-lg font-medium text-gray-700">
          <span className="font-semibold text-gray-900">Amount:</span>{" "}
          {razorpayOrderDetails.amount / 100} INR
        </p>
      </div>
    ) : (
      <p className="text-center text-gray-600 text-sm">
        No product details available.
      </p>
    )}

    <button
      onClick={handlepayment}
      className="w-full bg-blue-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors"
    >
      Pay with Razorpay
    </button>
  </div>
</div>

  );
};

export default Payment;
