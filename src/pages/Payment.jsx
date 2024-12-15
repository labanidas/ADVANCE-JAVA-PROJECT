import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "https://checkout.razorpay.com/v1/checkout.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { product } = location.state;
  const [loading, setLoading] = useState(true);
  const [razorpayOrderDetails, setRazorpayOrderDetails] = useState({});
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const userId = sessionStorage.getItem("user_id");
  sessionStorage.setItem("user_id", userId);

  useEffect(() => {
    const fetchRazorpayOrder = async () => {
      const apiUrl = `${BASE_URL}/PaymentHandler?product_id=${product.id}`;

      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
        }

        const JSONresponse = await response.json();
        setRazorpayOrderDetails(JSONresponse);
        setLoading(false);
      } catch (error) {
        console.error("Error:", error);
        toast.error("An error occurred! Please try again");
        setLoading(false);
      }
    };
    fetchRazorpayOrder();
  }, [BASE_URL, product.id]);

  const handlePayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_hvkuFk2j7mbLvi",
      amount: razorpayOrderDetails.amount,
      currency: "INR",
      name: "MedAccess",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: razorpayOrderDetails.id,
      handler: function (response) {
        toast.success("Order Placed!");
        updateOrderInDatabase("razorpay", "success", response);
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
    rzp1.on("payment.failed", function (response) {
      navigate("/payment", { state: { product } });
    });
    rzp1.open();
  };

  const handlePayOnDelivery = () => {
    toast.success("Order placed!");
    updateOrderInDatabase("pay on delivery", "pending");
    navigate("/products");
  };

  const updateOrderInDatabase = (paymentMode, paymentStatus, razorpayResponse) => {
    const apiUrl = `${BASE_URL}/OrderUpdate`;

    const orderData = new URLSearchParams({
      user_id: userId,
      product_id: product.id,
      qty: "1",
      payment_mode: paymentMode,
      payment_status: paymentStatus,
    });

    fetch(apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: orderData.toString(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          console.log("Order update success:", data.message);
        } else {
          console.error("Order update failed:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4 font-poppins">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Payment Page
        </h1>

        {product && razorpayOrderDetails ? (
          <div className="flex flex-col sm:flex-row bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full sm:w-1/3 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-4"
            />
            <div>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold text-gray-900">Product Name:</span> {product.name}
              </p>
              <p className="text-lg font-medium text-gray-700 flex items-center">
                <span className="font-semibold text-gray-900">Amount:</span> {loading ? (
                  <img className="h-6 ml-2" src="/Spinner.svg" alt="loading..." />
                ) : (
                  ` ${razorpayOrderDetails.amount / 100} INR`
                )}
              </p>
              <p className="text-lg font-medium text-gray-700">
                <span className="font-semibold text-gray-900">Description:</span> {product.description}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">No product details available.</p>
        )}

        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Pay Now
        </button>

        <div className="text-center text-gray-600 text-sm mb-4">or</div>

        <button
          onClick={handlePayOnDelivery}
          className="w-full bg-green-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-green-600 transition-colors"
        >
          Pay on Delivery
        </button>
      </div>
    </div>
  );
};

export default Payment;
