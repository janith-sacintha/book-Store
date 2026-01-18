import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import ImageSlider from "../../components/imageSlider";
import { addToCart } from "../../utils/cart";
import { AlertTriangle, MessageSquare } from "lucide-react";

export default function ProductOverviewPage() {
  const params = useParams();
  const [product, setProduct] = useState(null);
  const [loadingProduct, setLoadingProduct] = useState(true);
  const navigate = useNavigate();


  // Fetch product
  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/api/products/${params.productId}`)
      .then((res) => {
        setProduct(res.data);
        setLoadingProduct(false);
      })
      .catch(() => {
        toast.error("Failed to fetch product");
        setLoadingProduct(false);
      });
  }, [params.productId]);

  if (loadingProduct) return <Loader />;

  if (!product)
    return (
      <div className="flex items-center justify-center h-screen">
        <AlertTriangle size={48} className="text-red-600" />
        <span className="ml-3 text-lg font-semibold text-red-600">Product not found</span>
      </div>
    );

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gradient-to-br from-gray-50 to-purple-50 py-12 px-6">
      
      <div className="w-full max-w-6xl bg-white rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden">
        
        <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-100 p-6">
          <ImageSlider images={product.images} />
        </div>

        <div className="w-full md:w-1/2 flex flex-col px-10 py-8">
          <h1 className="text-4xl font-extrabold text-indigo-600 tracking-tight">{product.name}</h1>
          {product.altNames?.length > 0 && (
            <span className="text-sm text-orange-500 mt-2 font-medium">{product.altNames.join(" | ")}</span>
          )}
          <p className="mt-6 text-gray-600 leading-relaxed text-justify text-base">{product.description}</p>

          <div className="mt-8">
            {product.labelledPrice > product.price ? (
              <div className="flex items-center gap-4">
                <span className="line-through text-red-500 text-lg font-medium">
                  LKR {product.labelledPrice.toLocaleString("en-us")}
                </span>
                <span className="text-4xl text-green-700 font-extrabold">
                  LKR {product.price.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            ) : (
              <span className="text-4xl text-green-700 font-extrabold">
                LKR {product.price.toLocaleString("en-us", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <div className="mt-12 flex flex-col sm:flex-row gap-6">
            <button
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition"
              onClick={() => {
                addToCart(product, 1);
                toast.success("Product added to cart");
              }}
            >
              Add to Cart
            </button>

            <button
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 text-white font-semibold shadow-md hover:opacity-90 hover:scale-105 transition"
              onClick={() => {
                navigate("/checkout", {
                  state: {
                    items: [
                      {
                        productId: product.productId,
                        quantity: 1,
                        name: product.name,
                        image: product.images[0],
                        price: product.price,
                      },
                    ],
                  },
                });
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
