import { useNavigate } from "react-router-dom";
import RateStars from "./RateStars";

const ProductCard = (props) => {
  const product = props.product;
  const navigate = useNavigate();

  const handleQuickView = () => {
    navigate(`/products/${product.id}`);
  };

  return (
    <div className="product-card group relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <button
          onClick={handleQuickView}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white text-gray-800 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium text-sm shadow-lg hover:bg-gray-100"
        >
          Quick View
        </button>
      </div>

      <div className="p-6">
        <span className="text-sm text-gray-500">
          {product.category || "Uncategorized"}
        </span>

        <h3 className="text-lg font-semibold text-gray-900 mt-1 mb-1 line-clamp-2">
          {product.title}
        </h3>

        <div className="flex">
          <RateStars rating={product.rating} />
        </div>

        <div className="flex items-center justify-between mt-4">
          <span className="text-lg font-bold text-gray-900">
            ${product.price}
          </span>

          <button className="bg-gray-900 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors text-sm font-medium">
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
