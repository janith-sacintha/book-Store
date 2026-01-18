import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { BiEdit, BiPlus, BiTrash } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"
import Loader from "../../components/loader"
import Paginator from "../../components/paginator"

export default function ProductsAdminPage() {
  const [products, setProducts] = useState([])
  const [isLoading, setLoading] = useState(true)

  // pagination
  const [page, setPage] = useState(1)
  const [totalPages, setTotalpages] = useState(0)
  const [limit, setLimit] = useState(10)

  useEffect(() => {
    if (isLoading) {
      axios
        .get(
          import.meta.env.VITE_BACKEND_URL +
            "/api/products/" +
            page +
            "/" +
            limit
        )
        .then((res) => {
          setProducts(res.data.products)
          setTotalpages(res.data.totalPages)
          setLoading(false)
        })
    }
  }, [isLoading])

  const navigate = useNavigate()

  return (
    <div className="w-full h-full bg-orange-50 p-6">
      {isLoading ? (
        <Loader />
      ) : (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-orange-100">

          <div className="px-6 py-4 border-b border-orange-100 flex justify-between items-center">
            <h2 className="text-2xl font-bold text-orange-600">
              Products
            </h2>
            <span className="text-sm text-gray-500">
              Total: {products.length}
            </span>
          </div>

       
          <table className="w-full border-collapse">
            <thead className="bg-orange-100 text-orange-700">
              <tr>
                <th className="p-4 text-left">Image</th>
                <th className="p-4 text-left">Product ID</th>
                <th className="p-4 text-left">Name</th>
                <th className="p-4 text-center">Price</th>
                <th className="p-4 text-center">Labelled</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Stock</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product, index) => (
                <tr
                  key={index}
                  className="border-b last:border-none hover:bg-orange-50 transition"
                >
                  <td className="p-4">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-14 h-14 object-cover rounded-xl border"
                    />
                  </td>

                  <td className="p-4 text-gray-600">
                    {product.productId}
                  </td>

                  <td className="p-4 font-medium text-gray-800">
                    {product.name}
                  </td>

                  <td className="p-4 text-center font-semibold text-orange-600">
                    LKR{" "}
                    {product.price.toLocaleString("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </td>

                  <td className="p-4 text-center line-through text-gray-400">
                    LKR {product.labelledPrice}
                  </td>

                  <td className="p-4 text-gray-600">
                    {product.category}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        product.stock > 0
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.stock}
                    </span>
                  </td>

                  <td className="p-4 flex justify-center items-center gap-3">
                    <BiTrash
                      className="bg-red-500 text-white text-xl p-2 rounded-full cursor-pointer hover:bg-red-600 transition"
                      onClick={() => {
                        const token = localStorage.getItem("token")
                        if (!token) {
                          toast.error("Please login first")
                          navigate("/login")
                          return
                        }
                        axios
                          .delete(
                            import.meta.env.VITE_BACKEND_URL +
                              "/api/products/" +
                              product.productId,
                            {
                              headers: {
                                Authorization: "Bearer " + token,
                              },
                            }
                          )
                          .then(() => {
                            toast.success("Product deleted successfully")
                            setIsLoading(true)
                          })
                          .catch(() => {
                            toast.error("Failed to delete the product")
                          })
                      }}
                    />

                    <BiEdit
                      className="bg-orange-500 text-white text-xl p-2 rounded-full cursor-pointer hover:bg-orange-600 transition"
                      onClick={() => {
                        navigate("/admin/updateProduct", {
                          state: product,
                        })
                      }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <Paginator currentPage={page} setCurrentPage={setPage} totalPages={totalPages} limit={limit} setLimit={setLimit} setLoading={setLoading}/>

        </div>
      )}

    
      <Link
        to="/admin/newProduct"
        className="fixed bottom-10 right-10 flex items-center justify-center w-14 h-14 rounded-full bg-orange-600 text-white shadow-xl hover:bg-orange-700 transition"
      >
        <BiPlus className="text-3xl" />
      </Link>
    </div>
  )
}
