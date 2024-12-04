import React, { useEffect, useState } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the servlet
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:9080/Medicine/ProductServlet");
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading products...</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 px-4 md:px-8 lg:px-16 max-w-[1560px] mx-auto">
      {products.map((item) => (
        <div
          key={item.id}
          className="rounded-lg flex flex-col gap-3 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-white overflow-hidden"
        >
          <img
            className="h-48 w-full object-cover hover:scale-105 transition-transform duration-300"
            src={item.imageUrl}
            alt={item.name}
          />
          <div className="p-4 flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <h1 className="text-gray-800 font-bold text-lg truncate">
                {item.name}
              </h1>
              <p className="font-semibold text-green-600">₹{item.price}</p>
            </div>
            <p className="text-gray-600 text-sm line-clamp-2">
              {item.description}
            </p>
            <p
              className={`text-sm ${
                item.stock > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              {item.stock > 0 ? "In Stock" : "Out of Stock"}
            </p>
            <button
              className={`mt-2 ${
                item.stock > 0 ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-400"
              } text-white font-medium py-2 px-4 rounded-md transition-colors duration-300`}
              disabled={item.stock === 0}
            >
              {item.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
