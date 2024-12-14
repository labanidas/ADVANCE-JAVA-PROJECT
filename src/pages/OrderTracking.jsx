import React from "react";

const OrderTracking = () => {
  // Mock JSON Data
  const orderDetails = {
    order_id: "ORD123456",
    order_date: "2024-12-01",
    delivery_date: "2024-12-10",
    quantity: 2,
    payment_mode: "Credit Card",
    payment_status: "Paid",
    user: {
      name: "John Doe",
      address: "123 Main Street",
      city: "Mumbai",
      country: "India",
      pincode: "400001",
      mobile: "9876543210",
      email: "john.doe@example.com",
    },
    product: {
      product_name: "Vitamin C Tablets",
      description: "Helps boost immunity and improve overall health.",
      stock: 20,
      price: 599.0,
      image_url: "https://via.placeholder.com/150",
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 flex flex-col items-center p-4">
      <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 text-center mb-6">
          Track Your Order
        </h1>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Order Summary</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 border rounded-lg">
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Order ID:</span> {orderDetails.order_id}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Order Date:</span>{" "}
                {new Date(orderDetails.order_date).toLocaleDateString()}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Delivery Date:</span>{" "}
                {new Date(orderDetails.delivery_date).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-gray-50 p-4 border rounded-lg">
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Payment Mode:</span>{" "}
                {orderDetails.payment_mode}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Payment Status:</span>{" "}
                {orderDetails.payment_status}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Quantity:</span> {orderDetails.quantity}
              </p>
            </div>
          </div>
        </div>

        {/* User Information */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Customer Details</h2>
          <div className="bg-gray-50 p-4 border rounded-lg">
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Name:</span> {orderDetails.user.name}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Email:</span> {orderDetails.user.email}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Mobile:</span> {orderDetails.user.mobile}
            </p>
            <p className="text-lg font-medium text-gray-800">
              <span className="font-bold">Address:</span>{" "}
              {`${orderDetails.user.address}, ${orderDetails.user.city}, ${orderDetails.user.country} - ${orderDetails.user.pincode}`}
            </p>
          </div>
        </div>

        {/* Product Details */}
        <div className="mb-6">
          <h2 className="text-xl font-bold text-gray-700 mb-4">Product Details</h2>
          <div className="flex flex-col sm:flex-row items-center bg-gray-50 p-4 border rounded-lg">
            <img
              src={orderDetails.product.image_url}
              alt={orderDetails.product.product_name}
              className="w-full sm:w-48 h-48 object-cover rounded-lg mb-4 sm:mb-0 sm:mr-6"
            />
            <div>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Product Name:</span>{" "}
                {orderDetails.product.product_name}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Price:</span> ₹{orderDetails.product.price}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Stock:</span>{" "}
                {orderDetails.product.stock > 0 ? "In Stock" : "Out of Stock"}
              </p>
              <p className="text-lg font-medium text-gray-800">
                <span className="font-bold">Description:</span>{" "}
                {orderDetails.product.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTracking;
