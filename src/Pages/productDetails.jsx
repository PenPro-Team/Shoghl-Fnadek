import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AxiosProductsInstance } from "../Network/Remote/AxiosInstance";
import RateStars from "../components/products/RateStars";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await AxiosProductsInstance.get(`${id}`);
        setProduct(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading)
    return <div className="text-center py-12">Loading product...</div>;
  if (error)
    return <div className="text-center py-12 text-red-500">Error: {error}</div>;
  if (!product)
    return <div className="text-center py-12">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <div className="mb-4 rounded-lg overflow-hidden">
            <img
              src={product.images[selectedImage]?.image || product.image}
              alt={product.title}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto py-2">
            {[product.image, ...product.images.map((img) => img.image)].map(
              (img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-16 h-16 rounded-md overflow-hidden border-2 ${
                    selectedImage === index
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${index}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              )
            )}
          </div>
        </div>

        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.title}
          </h1>
          <div className="flex items-center mb-4">
            <RateStars rating={product.rating} />
          </div>
          <p className="text-2xl font-bold text-gray-900 mb-4">
            ${product.price}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center mb-6">
            <label className="mr-4 text-gray-700">Quantity:</label>
            <div className="flex rounded-md">
              <button
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                className="px-3 text-white py-1 bg-gray-100 hover:bg-gray-200"
              >
                -
              </button>
              <span className="px-4 py-3 border-none">{quantity}</span>
              <button
                onClick={() => setQuantity((prev) => prev + 1)}
                className="px-3 text-white py-1 bg-gray-100 hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          <button className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 mb-4">
            Add to Cart
          </button>

          <div className="border-t border-gray-200 pt-4">
            <div className="flex items-center mb-2">
              <span className="text-gray-600 w-24">Category:</span>
              <span className="text-gray-900">{product.category || "N/A"}</span>
            </div>
            <div className="flex items-center">
              <span className="text-gray-600 w-24">Availability:</span>
              <span
                className={`font-medium ${
                  product.quantity > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {product.quantity > 0 ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8">
            <button className="py-4 px-1 border-b-2 font-medium text-sm border-blue-500 text-blue-600">
              Description
            </button>
            <button className="py-4 px-1 border-b-2 font-medium text-sm border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300">
              Reviews
            </button>
          </nav>
        </div>
        <div className="py-6">
          <p className="text-gray-700">{product.description}</p>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Related Products
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center py-8 text-gray-500">
            Related products would appear here
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
