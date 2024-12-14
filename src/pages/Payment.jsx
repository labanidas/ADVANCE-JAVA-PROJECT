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


  // Fetch Razorpay order details using product ID from backend
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

  // Handle Razorpay payment
  const handlePayment = (e) => {
    e.preventDefault();

    var options = {
      key: "rzp_test_hvkuFk2j7mbLvi", // Your Razorpay key
      amount: razorpayOrderDetails.amount, // Amount in paisa (backend should provide this)
      currency: "INR",
      name: "MedAccess",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: razorpayOrderDetails.id, // Order ID from backend
      handler: function (response) {
        toast.success("Order Placed!");

        // After successful payment, send order details to backend (OrderUpdate)
        updateOrderInDatabase("razorpay", "success", response);

        // Navigate to products page
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
      // Redirect to the payment page in case of failure
      navigate("/payment", { state: { product } });
    });
    rzp1.open();
  };

  // Handle Pay on Delivery option
  const handlePayOnDelivery = () => {
    toast.success("Order placed!");

    // Send order details to backend for pay on delivery option
    updateOrderInDatabase("pay on delivery", "pending");

    // Navigate to products page
    navigate("/products");
  };

  // Function to update order data in the database
  const updateOrderInDatabase = (paymentMode, paymentStatus, razorpayResponse) => {

    const apiUrl = `${BASE_URL}/OrderUpdate`;

    const orderData = new URLSearchParams({
      user_id: userId,
      product_id: product.id, 
      qty: "1", 
      payment_mode: paymentMode, 
      payment_status: paymentStatus
      // razorpay_payment_id: razorpayResponse?.razorpay_payment_id || "", // Capture Razorpay payment ID
      // razorpay_order_id: razorpayResponse?.razorpay_order_id || "", // Capture Razorpay order ID
      // razorpay_signature: razorpayResponse?.razorpay_signature || "" // Capture Razorpay signature
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
    <div className="min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Payment Page
        </h1>

        {/* Check if product and razorpayOrderDetails are available */}
        {product && razorpayOrderDetails ? (
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
            <p className="text-lg font-medium text-gray-700">
              <span className="font-semibold text-gray-900">Product Name:</span> {product.name}
            </p>
            <p className="text-lg font-medium text-gray-700 flex items-center">
              <span className="font-semibold text-gray-900">Amount:</span>{loading? <span><img className="h-[7vh]" src="/Spinner.svg" alt="loading..." /></span> : ` ${razorpayOrderDetails.amount / 100} INR` }
            </p>
          </div>
        ) : (
          <p className="text-center text-gray-600 text-sm">No product details available.</p>
        )}

        {/* Pay Now Button */}
        <button
          onClick={handlePayment}
          className="w-full bg-blue-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
        >
          Pay Now
        </button>

        <div className="text-center text-gray-600 text-sm mb-4">or</div>

        {/* Pay on Delivery Button */}
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

// import React, { useEffect, useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "https://checkout.razorpay.com/v1/checkout.js";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const Payment = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { product } = location.state;
//   const [razorpayOrderDetails, setRazorpayOrderDetails] = useState({});
//   const BASE_URL = import.meta.env.VITE_BASE_URL;

//   useEffect(() => {
//     const fetchRazoroayOrder = async () => {
//       const apiUrl = `${BASE_URL}/PaymentHandler?product_id=${product.id}`;

//       try {
//         const response = await fetch(apiUrl, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/x-www-form-urlencoded",
//           },
//         });

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
//         }

//         const JSONresponse = await response.json();
//         setRazorpayOrderDetails(JSONresponse);
//       } catch (error) {
//         console.error("Error:", error);
//         toast.error("An error occurred! Please try again");
//       }
//     };
//     fetchRazoroayOrder();
//   }, []);

//   const handlepayment = (e) => {
//     e.preventDefault();

//     var options = {
//       key: "rzp_test_hvkuFk2j7mbLvi",
//       amount: razorpayOrderDetails.amount,
//       currency: "INR",
//       name: "MedAccess",
//       description: "Test Transaction",
//       image: "https://example.com/your_logo",
//       order_id: razorpayOrderDetails.id,
//       handler: function (response) {
//         toast.success("Thank you so much!");
//         navigate("/products");
//       },
//       prefill: {
//         name: "XYZ",
//         email: "XYZ@example.com",
//         contact: "9000090000",
//       },
//       notes: {
//         address: "Razorpay Corporate Office",
//       },
//       theme: {
//         color: "#3399cc",
//       },
//     };

//     var rzp1 = new Razorpay(options);
//     rzp1.on('payment.failed', function (response) {
//       navigate("/payment", { state: { product } });
//     });
//     rzp1.open();
//   };

//   const handlePayOnDelivery = () => {
//     toast.success("Order placed!");
//     navigate("/products");
//   };

//   return (
//     <div className="min-h-[70vh] bg-gradient-to-br from-blue-100 to-indigo-200 flex items-center justify-center p-4">
//       <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
//           Payment Page
//         </h1>

//         {product && razorpayOrderDetails ? (
//           <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold text-gray-900">Product Name:</span>{" "}
//               {product.name}
//             </p>
//             <p className="text-lg font-medium text-gray-700">
//               <span className="font-semibold text-gray-900">Amount:</span>{" "}
//               {razorpayOrderDetails.amount / 100} INR
//             </p>
//           </div>
//         ) : (
//           <p className="text-center text-gray-600 text-sm">
//             No product details available.
//           </p>
//         )}

//         <button
//           onClick={handlepayment}
//           className="w-full bg-blue-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-blue-600 transition-colors mb-4"
//         >
//           Pay Now
//         </button>
//         <div className="text-center text-gray-600 text-sm mb-4">or</div>
//         <button
//           onClick={handlePayOnDelivery}
//           className="w-full bg-green-500 text-white py-3 text-lg font-medium rounded-lg hover:bg-green-600 transition-colors"
//         >
//           Pay on Delivery
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Payment;
