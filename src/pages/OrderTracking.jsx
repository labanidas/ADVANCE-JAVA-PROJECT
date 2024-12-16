

import React, { useState, useEffect } from "react";
const OrderTracking = () => {
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = import.meta.env.VITE_BASE_URL;

  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0"); 
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const isDelivered = (deliveryDate) => {
    const today = new Date();
    return new Date(deliveryDate) <= today;
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const userId = sessionStorage.getItem("user_id");
        console.log("user_id:", userId);
        const response = await fetch(`${BASE_URL}/OrderTracker?user_id=${userId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch orders.");
        }
        const data = await response.json();
        setOrders(data.orders);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleOrderDetails = (orderId) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (loading) {
    return (
      <div className="w-[10vw] h-full mx-auto">
        <img className="h-[20vh]" src="/Spinner.svg" alt="" />
      </div>
    );
  }
  if (error) {
    return <div className="text-center text-lg text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        {orders.length === 0 ? (
          <div className="text-center text-lg font-semibold text-gray-700">No orders found</div>
        ) : (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
              Track Your Orders
            </h1>

            {orders.map((order) => (
              <div key={order.order_id} className="mb-6 border-b border-gray-300 pb-4">
                <div className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 border rounded-lg">
                  <img
                    src={order.product.image_url}
                    alt={order.product.product_name}
                    className="w-full sm:w-32 h-32 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
                  />
                  <div>
                    <p className="text-lg font-medium text-gray-800">
                      <span className="font-bold">Product Name:</span>{" "}
                      {order.product.product_name}
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                      <span className="font-bold">Quantity:</span> {order.quantity}
                    </p>
                    <p className="text-lg font-medium text-gray-800">
                       <span className="font-bold">Delivery Status:</span>{" "}
                        <span
                        className={`${
                          isDelivered(order.delivery_date) ? "text-green-600" : "text-gray-800"
                        }`}
                         >
                        {isDelivered(order.delivery_date)
                          ? `Delivered on ${formatDate(order.delivery_date)}`
                          : `Arriving on ${formatDate(order.delivery_date)}`}
                          </span>
                      </p>
                    <button
                      onClick={() => toggleOrderDetails(order.order_id)}
                      className="mt-2 text-blue-500 underline text-sm"
                    >
                      {expandedOrders[order.order_id] ? "Show Less" : "View Order Details"}
                    </button>
                  </div>
                </div>

                {expandedOrders[order.order_id] && (
                  <div className="mt-4">
                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">Order Summary</h2>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gray-50 p-4 border rounded-lg">
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Order ID:</span> {order.order_id}
                          </p>
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Order Date:</span>{" "}
                            {formatDate(order.order_date)}
                          </p>
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Delivery Date:</span>{" "}
                            {formatDate(order.delivery_date)}
                          </p>
                        </div>
                        <div className="bg-gray-50 p-4 border rounded-lg">
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Payment Mode:</span>{" "}
                            {order.payment_mode}
                          </p>
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Payment Status:</span>{" "}
                            {isDelivered(order.delivery_date)
                          ? `Success`
                          : order.payment_status}
                          </p>
                          <p className="text-lg font-medium text-gray-800">
                            <span className="font-bold">Price:</span> ₹
                            {order.product.price}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h2 className="text-xl font-bold text-gray-700 mb-2">
                        Delivery Details
                      </h2>
                      <div className="bg-gray-50 p-4 border rounded-lg">
                        <p className="text-lg font-medium text-gray-800">
                          <span className="font-bold">Name:</span> {order.user.name}
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          <span className="font-bold">Email:</span> {order.user.email}
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          <span className="font-bold">Mobile:</span> {order.user.mobile}
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          <span className="font-bold">Address:</span>{" "}
                          {`${order.user.address}, ${order.user.city}, ${order.user.country} - ${order.user.pincode}`}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
