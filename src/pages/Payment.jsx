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
  const [quantity, setQuantity] = useState(1);
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const userId = sessionStorage.getItem("user_id");
  sessionStorage.setItem("user_id", userId);

  useEffect(() => {
    const fetchRazorpayOrder = async () => {
      const totalPrice = product.price * quantity; // Calculate total price
      const apiUrl = `${BASE_URL}/PaymentHandler?product_id=${product.id}&total_price=${totalPrice}`;
      console.log(product.stock)
  
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
  }, [BASE_URL, product.id, quantity]);
  

  const handleQuantityChange = (operation) => {
    setQuantity((prevQuantity) => (operation === "increment" ? prevQuantity + 1 : Math.max(1, prevQuantity - 1)));
    console.log()
  };

  const handlePayment = (e) => {
    e.preventDefault();
  
    const totalAmount = razorpayOrderDetails.amount * quantity; // Updated to include quantity
  
    var options = {
      key: "rzp_test_hvkuFk2j7mbLvi",
      amount: totalAmount,
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
      toast.error("Payment Failed. Please try again.");
    });
    rzp1.open();
  };
  

  const handlePayOnDelivery = () => {
    toast.success("Order placed!");
    updateOrderInDatabase("pay on delivery", "pending");
    navigate("/products");
  };

  const updateOrderInDatabase = (paymentMode, paymentStatus) => {
    const totalPrice = product.price * quantity; // Calculate total price
    const apiUrl = `${BASE_URL}/OrderUpdate`;
  
    const orderData = new URLSearchParams({
      user_id: userId,
      product_id: product.id,
      qty: quantity,
      total_price: totalPrice,
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
          console.log("Order updated successfully:", data.message);
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
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-6">
        {product && razorpayOrderDetails ? (
          <>
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full md:w-1/3 h-64 object-contain rounded-lg"
            />
            <div className="w-full">
              <p className="text-2xl font-semibold text-gray-900 mb-4">{product.name}</p>
              <p className="text-lg font-medium text-gray-700 mb-4">
                <span className="font-semibold text-gray-900">Description:</span> {product.description}
              </p>
              
              <div className="text-lg font-medium text-gray-700 mb-4 flex items-center space-x-4">
                <label className="font-semibold text-gray-900">Qty:</label>
                <div className="flex items-center">
                  <button
                  onClick={() => handleQuantityChange("decrement")}
                  className="bg-gray-300 px-3 py-1 rounded-l-lg hover:bg-gray-400"
                  >
                    -
                  </button>
                <span className="px-3 border-t border-b">{quantity}</span>
                <button
                  onClick={() => quantity < 20 && handleQuantityChange("increment")} disabled={quantity >= 20 || quantity >= product.stock }
                  className="bg-gray-300 px-3 py-1 rounded-r-lg hover:bg-gray-400"
                  >
                  +
                  </button>
                  </div>
                  </div>
              <p className="text-lg font-medium text-gray-700 mb-5 space-x-1">
                <span className="font-semibold text-gray-900">Price:</span>{" "}
                {loading ? (
                  <img className="h-6 ml-2" src="/Spinner.svg" alt="loading..." />
                ) : (
                  <span>₹{product.price * quantity}</span>
                )}
              </p>

              <button
                onClick={handlePayment}
                className="w-full bg-blue-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
                disabled={loading}
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
          </>
        ) : (
          <p className="text-center text-gray-600 text-sm">No product details available.</p>
        )}
      </div>
    </div>
  );
};

export default Payment;
