import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiTrash } from "react-icons/bi"
import { Link, useLocation, useNavigate } from "react-router-dom"

export default function CheckoutPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const [cart, setCart] = useState(location.state?.items || [])
  const [user, setUser] = useState(null)

  const [name, setName] = useState("")
  const [address, setAddress] = useState("")
  const [phone, setPhone] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      navigate("/login")
      return
    }

    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/users/", {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setUser(res.data)
        setName(res.data.name.firstName+"-"+ res.data.name.lastName)
      })
      .catch((error) => console.log(error))
  }, [navigate])

  if (location.state == null) {
    toast.error("Please add products to the cart first")
    navigate("/products")
  }

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  async function placeOrder() {
    const token = localStorage.getItem("token")
    if (!token) {
      toast.error("Login first to place the Order")
      navigate("/login")
      return
    }

    if (!name || !address || !phone) {
      toast.error("Please fill in all details before placing the order")
      return
    }

    const order = {
      name,
      address,
      phone,
      items: cart.map((item) => ({
        productId: item.productId,
        qty: item.quantity,
      })),
    }

    try {
      await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/orders", order, {
        headers: { Authorization: `Bearer ${token}` },
      })
      toast.success("Order placed successfully")
      navigate("/my-orders")
    } catch (error) {
      console.error(error)
      toast.error("Failed to place order")
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-50 to-purple-50 py-12 flex flex-col items-center gap-10">
      <h1 className="text-3xl font-extrabold text-indigo-600 tracking-wide">
        Checkout
      </h1>

  
      <div className="flex flex-col gap-6 w-full max-w-4xl">
        {cart.map((item, index) => (
          <div
            key={item.productId}
            className="flex items-center bg-white rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition overflow-hidden"
          >
            <img
              src={item.image}
              className="w-32 h-32 object-cover rounded-l-2xl"
            />

            <div className="flex-1 px-6 py-4 flex flex-col justify-center">
              <h2 className="text-lg font-semibold text-gray-800">
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
                  const newCart = [...cart]
                  newCart[index].quantity -= 1
                  if (newCart[index].quantity <= 0) newCart.splice(index, 1)
                  setCart(newCart)
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
                  const newCart = [...cart]
                  newCart[index].quantity += 1
                  setCart(newCart)
                }}
              >
                +
              </button>
            </div>

            <div className="px-6 font-semibold text-gray-700">
              LKR{" "}
              {(item.quantity * item.price).toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </div>

            <button
              className="mr-6 p-2 rounded-full bg-red-500 text-white hover:bg-red-600 transition"
              onClick={() => {
                const newCart = [...cart]
                newCart.splice(index, 1)
                setCart(newCart)
              }}
            >
              <BiTrash size={20} />
            </button>
          </div>
        ))}
      </div>


      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl border border-gray-100 p-8 space-y-5">
        <h2 className="text-xl font-bold text-gray-800">Customer Details</h2>
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />
      </div>

      {/* Total + Place Order */}
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

        <button
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-pink-500 text-white font-semibold hover:opacity-90 hover:scale-105 transition"
          onClick={placeOrder}
        >
          Place Order
        </button>
      </div>
    </div>
  )
}
