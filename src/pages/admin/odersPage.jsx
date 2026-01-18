import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { useNavigate } from "react-router-dom"
import Paginator from "../../components/paginator.jsx"

export default function OrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  // pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalpages] = useState(0)
  const [limit, setLimit] = useState(10)

  const [popUpVissible, setPopUpVissible] = useState(false)
  const [clickedOrder, setClickedOrder] = useState(null)
  const [status, setStatus] = useState("pending")
  const [notes, setNotes] = useState("")

  useEffect(() => {
    const token = localStorage.getItem("token")

    axios
      .get(
        import.meta.env.VITE_BACKEND_URL +
          "/api/orders/" +
          page +
          "/" +
          limit,
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((res) => {
        setOrders(res.data.orders)
        setTotalpages(res.data.totalPages)
        setLoading(false)
      })
      .catch(() => {
        toast.error("Failed to fetch orders")
        setLoading(false)
      })
  }, [page, limit, loading])

  const handleUpdate = async () => {
    setPopUpVissible(false)
    try {
      const token = localStorage.getItem("token")
      await axios.put(
        import.meta.env.VITE_BACKEND_URL +
          "/api/orders/" +
          clickedOrder.orderId,
        { status, notes },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      toast.success("Order updated successfully")
      setLoading(true)
    } catch {
      toast.error("Failed to update order")
    }
  }

  return (
    <div className="w-full h-full bg-orange-50 p-6">
      {loading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-2xl shadow-md border border-orange-100 overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-orange-100">
            <h1 className="text-2xl font-bold text-orange-600">
              Orders
            </h1>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-700">
              <thead className="bg-orange-100 text-orange-700 uppercase text-xs font-semibold">
                <tr>
                  <th className="px-6 py-3">Order ID</th>
                  <th className="px-6 py-3">Name</th>
                  <th className="px-6 py-3">Address</th>
                  <th className="px-6 py-3">Phone</th>
                  <th className="px-6 py-3">Email</th>
                  <th className="px-6 py-3 text-right">Total</th>
                  <th className="px-6 py-3">Date</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order.orderId}
                    className="border-b hover:bg-orange-50 cursor-pointer transition"
                    onClick={() => {
                      setNotes(order.notes)
                      setStatus(order.status)
                      setClickedOrder(order)
                      setPopUpVissible(true)
                    }}
                  >
                    <td className="px-6 py-4 font-medium">
                      {order.orderId}
                    </td>
                    <td className="px-6 py-4">{order.name}</td>
                    <td className="px-6 py-4">{order.address}</td>
                    <td className="px-6 py-4">{order.phone}</td>
                    <td className="px-6 py-4">{order.email}</td>
                    <td className="px-6 py-4 text-right font-semibold text-orange-600">
                      LKR{" "}
                      {order.total?.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4">
                      {new Date(order.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === "delivered"
                            ? "bg-green-100 text-green-700"
                            : order.status === "processing"
                            ? "bg-orange-100 text-orange-700"
                            : order.status === "shipped"
                            ? "bg-blue-100 text-blue-700"
                            : order.status === "cancelled"
                            ? "bg-red-100 text-red-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Paginator
            currentPage={page}
            setCurrentPage={setPage}
            totalPages={totalPages}
            limit={limit}
            setLimit={setLimit}
            setLoading={setLoading}
          />
        </div>
      )}

      {/* Popup */}
      {popUpVissible && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white w-[850px] max-h-[90vh] overflow-y-auto rounded-2xl shadow-xl p-8 relative">
            <h2 className="text-xl font-bold text-orange-600 mb-6">
              Order Details
            </h2>

            <div className="grid grid-cols-2 gap-6 mb-6">
              <div>
                <label className="text-gray-500">Order ID</label>
                <p>{clickedOrder.orderId}</p>
              </div>
              <div>
                <label className="text-gray-500">Customer</label>
                <p>{clickedOrder.name}</p>
              </div>
              <div>
                <label className="text-gray-500">Email</label>
                <p>{clickedOrder.email}</p>
              </div>
              <div>
                <label className="text-gray-500">Phone</label>
                <p>{clickedOrder.phone}</p>
              </div>
              <div className="col-span-2">
                <label className="text-gray-500">Address</label>
                <p>{clickedOrder.address}</p>
              </div>
            </div>

            <div className="mb-6">
              <label className="text-gray-500">Notes</label>
              <textarea
                className="w-full border rounded-xl p-3 mt-2"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label className="text-gray-500">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-xl p-3 mt-2 focus:ring-2 focus:ring-orange-400"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>

            {(status !== clickedOrder.status ||
              notes !== clickedOrder.notes) && (
              <button
                onClick={handleUpdate}
                className="w-full bg-orange-600 text-white py-3 rounded-xl font-semibold hover:bg-orange-700 transition"
              >
                Update Order
              </button>
            )}

            <button
              onClick={() => setPopUpVissible(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
