import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
import Loader from "../../components/loader"
import { ArrowLeft, CheckCircle2, Package, MapPin, Phone, Calendar, CreditCard } from "lucide-react"

export default function OrderDetailsPage() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const steps = ["Pending", "Processing", "Shipped", "Delivered"]

  useEffect(() => {
    const token = localStorage.getItem("token")
    axios
      .get(import.meta.env.VITE_BACKEND_URL + `/api/orders/${orderId}`, {
        headers: { Authorization: "Bearer " + token },
      })
      .then((res) => {
        setOrder(res.data)
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        toast.error("Fetching order details failed")
      })
  }, [orderId])

  if (loading) return <Loader />

  const currentStep = steps.findIndex(
    (s) => s.toLowerCase() === order.status.toLowerCase()
  )

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 flex justify-center">
      <div className="w-11/12 md:w-3/4 lg:w-2/3 bg-white rounded-3xl shadow-2xl p-10 relative overflow-hidden">
        
       
        <button
          onClick={() => navigate(-1)}
          className="absolute left-6 top-6 flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          <ArrowLeft size={18} /> Back
        </button>

       
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-12 text-center">
          Order <span className="text-gray-800">#{order.orderId}</span>
        </h1>


        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package className="text-indigo-600" size={20} /> Customer Info
            </h2>
            <p className="mb-2 flex items-center gap-2"><Phone className="text-gray-500" size={16}/> <span>{order.name}</span></p>
            <p className="mb-2"><span className="font-medium">Phone:</span> {order.phone}</p>
            <p className="flex items-start gap-2"><MapPin className="text-gray-500" size={16}/> {order.address}</p>
          </div>

          <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-6 shadow-md border border-gray-200">
            <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <CreditCard className="text-indigo-600" size={20}/> Order Info
            </h2>
            <p className="mb-2 flex items-center gap-2"><Calendar className="text-gray-500" size={16}/> {new Date(order.date).toLocaleString()}</p>
            <p className="mb-2">
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`ml-2 px-3 py-1 rounded-full text-sm font-semibold ${
                  {
                    delivered: "bg-green-500 text-white",
                    processing: "bg-amber-500 text-white",
                    cancelled: "bg-rose-600 text-white",
                    shipped: "bg-indigo-600 text-white",
                    pending: "bg-sky-500 text-white",
                  }[order.status.toLowerCase()] || "bg-gray-400 text-white"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p><span className="font-medium">Total:</span> LKR{" "}
              {order.total.toLocaleString("en-us", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}
            </p>
          </div>
        </div>

     
        <div className="mb-14">
          <h2 className="text-2xl font-bold text-gray-800 mb-8 text-center">
            Order Progress
          </h2>
          <div className="flex items-center justify-between relative">
            {steps.map((step, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white shadow-md ${
                    index <= currentStep
                      ? "bg-indigo-600"
                      : "bg-gray-300"
                  }`}
                >
                  {index <= currentStep ? (
                    <CheckCircle2 size={22} />
                  ) : (
                    index + 1
                  )}
                </div>
                <p
                  className={`mt-3 text-sm font-medium ${
                    index <= currentStep ? "text-indigo-600" : "text-gray-500"
                  }`}
                >
                  {step}
                </p>
              </div>
            ))}
       
            <div className="absolute top-6 left-0 w-full h-[3px] bg-gray-300 -z-10">
              <div
                className="h-[3px] bg-indigo-600 transition-all"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              ></div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Items</h2>
        <div className="space-y-5">
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-5 shadow-sm border border-gray-200 hover:shadow-md transition"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 rounded-xl object-cover border border-indigo-400"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{item.name}</p>
                <p className="text-sm text-gray-600">Qty: {item.qty}</p>
              </div>
              <p className="font-bold text-gray-800">
                LKR {(item.price * item.qty).toLocaleString("en-us", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
