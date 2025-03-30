import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosProductsInstance } from "../Network/Remote/AxiosInstance";
import ProductCard from "../components/products/productCard";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    count: 0,
    totalPages: 1,
    currentPage: 1,
    next: null,
    previous: null,
  });
  const queryParams = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState({
    min: "",
    max: "",
  });
  const page = queryParams.get("page") || 1;
  const search = queryParams.get("search");
  const minPrice = queryParams.get("minprice");
  const maxPrice = queryParams.get("maxprice");

  useEffect(() => {
    setSearchTerm(search || "");
    setPriceRange({
      min: minPrice || "",
      max: maxPrice || "",
    });
  }, [search, minPrice, maxPrice]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();

    params.set("page", 1);

    if (searchTerm) params.set("search", searchTerm);
    if (priceRange.min) params.set("minprice", priceRange.min);
    if (priceRange.max) params.set("maxprice", priceRange.max);

    navigate(`?${params.toString()}`);
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setPriceRange({ min: "", max: "" });
    navigate("?page=1");
  };

  useEffect(() => {
    console.log("URL Parameters:", {
      page,
      search,
      minPrice,
      maxPrice,
    });
    const params = {};
    if (page) params.page = page;
    if (search) params.search = search;
    if (minPrice) params.minprice = minPrice;
    if (maxPrice) params.maxprice = maxPrice;

    setLoading(true);
    setError(null);

    AxiosProductsInstance.get("", { params })
      .then((res) => {
        console.log("Responce: ", res.data);
        setProducts(res.data.results);
        setPagination({
          count: res.data.count,
          totalPages: res.data.total_pages,
          currentPage: parseInt(page),
          next: res.data.next,
          previous: res.data.previous,
        });
      })
      .catch((error) => {
        if (error.response) {
          throw new Error(
            `Request failed with status ${error.response.status}`
          );
        } else if (error.request) {
          throw new Error("No response received from server");
        } else {
          throw new Error("Error setting up request");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, [location.search, page, search, minPrice, maxPrice]);

  const handlePageChange = (newPage) => {
    const params = new URLSearchParams(location.search);
    params.set("page", newPage);
    navigate(`?${params.toString()}`);
  };

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <form onSubmit={handleSearchSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Search Input */}
            <div>
              <label
                htmlFor="search"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Search Products
              </label>
              <input
                type="text"
                id="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by name or description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Min Price Input */}
            <div>
              <label
                htmlFor="minPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Min Price
              </label>
              <input
                type="number"
                id="minPrice"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, min: e.target.value })
                }
                placeholder="Minimum price"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            {/* Max Price Input */}
            <div>
              <label
                htmlFor="maxPrice"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Max Price
              </label>
              <input
                type="number"
                id="maxPrice"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange({ ...priceRange, max: e.target.value })
                }
                placeholder="Maximum price"
                min="0"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={handleResetFilters}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Reset Filters
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Apply Filters
            </button>
          </div>
        </form>
      </div>

      {/* Current Filters Display */}
      {(search || minPrice || maxPrice) && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-medium text-gray-500 mb-2">
            Active Filters:
          </h3>
          <div className="flex flex-wrap gap-2">
            {search && (
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                Search: {search}
              </span>
            )}
            {minPrice && (
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                Min Price: ${minPrice}
              </span>
            )}
            {maxPrice && (
              <span className="px-3 py-1 bg-white rounded-full text-sm text-gray-700 border border-gray-200">
                Max Price: ${maxPrice}
              </span>
            )}
          </div>
        </div>
      )}

      {/* Products Grid */}
      <div className="products-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <ProductCard product={product} />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-lg text-gray-500">
              No products found with these filters
            </p>
            <button
              onClick={handleResetFilters}
              className="mt-4 bg-gray-900 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>

      {/* Pagination */}
      {pagination.totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="flex items-center gap-1">
            <button
              onClick={() => handlePageChange(pagination.currentPage - 1)}
              disabled={!pagination.previous}
              className={`px-3 py-1 rounded-md ${
                !pagination.previous
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              &larr; Previous
            </button>

            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  className={`px-3 py-1 rounded-md ${
                    pageNum === pagination.currentPage
                      ? "bg-blue-500 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {pageNum}
                </button>
              )
            )}

            <button
              onClick={() => handlePageChange(pagination.currentPage + 1)}
              disabled={!pagination.next}
              className={`px-3 py-1 rounded-md ${
                !pagination.next
                  ? "text-gray-400 cursor-not-allowed"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              Next &rarr;
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Products;
