import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import {
  FaBoxOpen,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaShoppingBag,
} from "react-icons/fa"
import Paginator from "../../components/paginator"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)

  const navigate = useNavigate()


  const statusStyles = {
    delivered: "bg-green-100 text-green-700 ring-1 ring-green-300",
    processing: "bg-amber-100 text-amber-700 ring-1 ring-amber-300 animate-pulse",
    shipped: "bg-indigo-100 text-indigo-700 ring-1 ring-indigo-300",
    pending: "bg-sky-100 text-sky-700 ring-1 ring-sky-300",
    cancelled: "bg-rose-100 text-rose-700 ring-1 ring-rose-300",
  }


  useEffect(() => {
    const token = localStorage.getItem("token")
    setLoading(true)

    axios
      .get(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders/${page}/${limit}`,
        {
          headers: { Authorization: "Bearer " + token },
        }
      )
      .then((res) => {
        setOrders(res.data.orders)
        setTotalPages(res.data.totalPages)
      })
      .catch(() => toast.error("Fetching orders failed"))
      .finally(() => setLoading(false))
  }, [page, limit])


  return (
    <div className="w-full min-h-screen flex justify-center bg-gray-50 pt-10">
      {loading ? (
        <Loader />
      ) : (
        <div className="w-11/12 max-w-6xl">
          <h1 className="text-4xl font-extrabold text-indigo-700 mb-10">
            My Orders
          </h1>

         
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center text-center py-20">
              <FaShoppingBag className="text-gray-400 text-7xl mb-6" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-500 mb-6 max-w-md">
                Looks like you haven’t placed any orders yet.
              </p>
              <button
                onClick={() => navigate("/products")}
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-md hover:bg-indigo-700 transition"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <>
            
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() =>
                      navigate(`/my-orders/${order.orderId}`)
                    }
                    className="rounded-2xl shadow-md hover:shadow-xl transition duration-200 p-6 cursor-pointer border border-gray-100 bg-white"
                  >
                 
                    <div className="flex justify-between items-center mb-4">
                      <h2 className="text-lg font-bold text-gray-800">
                        Order #{order.orderId}
                      </h2>

                      <span
                        className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wide shadow-sm ${
                          statusStyles[order.status?.toLowerCase()] ||
                          "bg-gray-100 text-gray-700 ring-1 ring-gray-300"
                        }`}
                      >
                        {order.status}
                      </span>
                    </div>

               
                    <div className="flex gap-4 mb-4">
                      {order.items.slice(0,  3).map((item, i) => (
                        <img
                          key={i}
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 rounded-lg object-cover border"
                        />
                      ))}
                      {order.items.length > 3 && (
                        <div className="flex items-center justify-center w-16 h-16 rounded-lg bg-gray-100 text-gray-600 font-semibold">
                          +{order.items.length - 3}
                        </div>
                      )}
                    </div>

          
                    <div className="text-sm text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <FaBoxOpen className="text-indigo-500" />
                        {order.items.length} items
                      </p>

                      <p className="flex items-center gap-2">
                        <FaMoneyBillWave className="text-green-500" />
                        LKR{" "}
                        {order.total.toLocaleString("en-US", {
                          minimumFractionDigits: 2,
                        })}
                      </p>

                      <p className="flex items-center gap-2">
                        <FaCalendarAlt className="text-rose-500" />
                        {new Date(order.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* PAGINATOR */}
              <div className="mt-12 flex justify-center">
                <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} limit={limit} setLimit={setLimit} setLoading={setLoading}/>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}
