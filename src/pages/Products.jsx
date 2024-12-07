import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    // Fetch data from the servlet
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:8082/Backend/ProductServlet");
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleSearch = () => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredProducts(filtered);
  };

  const handleBuyNow = (product) => {
    // Navigate to the payment page with the productId
    navigate("/payment", { state: { product } });
  };

  if (loading) {

    return (
      <div className="w-[20vw] mx-auto">
        <img className="h-[40vh]" src="/Spinner.svg" alt="" />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 lg:px-16 max-w-[1560px] mx-auto">
      {/* Search Bar */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search for a medicine..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
        />
        <button
          onClick={handleSearch}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-300"
        >
          Search
        </button>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
        {filteredProducts.map((item) => (
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
                onClick={() => handleBuyNow(item)}
              >
                {item.stock > 0 ? "Buy Now" : "Out of Stock"}
              </button>
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
              onClick={() => handleBuyNow(item)}
            >
              {item.stock > 0 ? "Buy Now" : "Out of Stock"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;