import { useState } from "react"
import { addToCart, getCart, getTotal } from "../../utils/cart.js"
import { BiTrash } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"

export default function CartPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(getCart())

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-purple-50 py-12 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-extrabold text-indigo-600 tracking-wide">
        Your Shopping Cart
      </h1>

      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {cart.length === 0 ? (
          <div className="w-full bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col items-center justify-center py-20">
            <p className="text-lg text-gray-500">Your cart is empty 🛒</p>
            <button
              onClick={() => navigate("/products")}
              className="mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition"
            >
              Browse Products
            </button>
          </div>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="flex items-center bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition overflow-hidden"
            >
              <img
                src={item.image}
                className="w-32 h-32 object-cover rounded-l-2xl"
              />

              <div className="flex-1 px-6 py-4 flex flex-col justify-center">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name}
                </h2>
                <p className="text-purple-600 font-bold">
                  LKR{" "}
                  {item.price.toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
                <Link
                  to={`/overview/${item.productId}`}
                  className="mt-2 text-sm text-blue-600 hover:underline"
                >
                  View product info →
                </Link>
              </div>

              <div className="flex items-center gap-3 px-4">
                <button
                  className="w-9 h-9 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition"
                  onClick={() => {
                    addToCart(item, -1)
                    setCart(getCart())
                  }}
                >
                  −
                </button>
                <span className="w-6 text-center font-medium">
                  {item.quantity}
                </span>
                <button
                  className="w-9 h-9 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-400 transition"
                  onClick={() => {
                    addToCart(item, 1)
                    setCart(getCart())
                  }}
                >
                  +
                </button>
              </div>

              <div className="px-6">
                <span className="font-bold text-gray-800">
                  LKR{" "}
                  {(item.quantity * item.price).toLocaleString("en-us", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>

              <button
                className="mr-6 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
                onClick={() => {
                  addToCart(item, -item.quantity)
                  setCart(getCart())
                }}
              >
                <BiTrash size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {cart.length > 0 && (
        <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-xl font-bold text-gray-800">
            Total:{" "}
            <span className="text-green-600">
              LKR{" "}
              {getTotal().toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </span>
          </span>

          <div className="flex gap-4">
            <button
              className="px-6 py-3 rounded-xl border-2 border-blue-500 bg-blue-500 text-white font-semibold hover:bg-white hover:text-blue-500 transition"
              onClick={() => {
                navigate("/products")
              }}
            >
              Continue Shoppings
            </button>

            <button
              className="px-6 py-3 rounded-xl border-2 border-orange-500 bg-orange-500 text-white font-semibold hover:bg-white hover:text-orange-500 transition"
              onClick={() => {
                navigate("/checkout", { state: { items: cart } })
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
