import { Link, Route, Routes, useLocation } from "react-router-dom"
import { GiShoppingBag } from "react-icons/gi"
import { HiMiniShoppingCart } from "react-icons/hi2"
import ProductsAdminPage from "./admin/productsAdminPage"
import AddProductAdminPage from "./admin/addProductAdminPage"
import UpdateProductPage from "./admin/updateProduct"
import OrdersPage from "./admin/odersPage"
import UpdateOrderPage from "./admin/orderUpdatePage"

export default function AdminPage() {
  const location = useLocation()

  const isActive = (path) =>
    location.pathname.startsWith(path)
      ? "bg-orange-100 text-orange-600"
      : "text-gray-700 hover:bg-orange-50 hover:text-orange-500"

  return (
    <div className="w-full min-h-screen flex bg-orange-50">

      <aside className="w-[280px] min-h-screen bg-white border-r border-orange-100 flex flex-col">
        <div className="py-8 text-center border-b border-orange-100">
          <h1 className="text-3xl font-extrabold text-orange-600">
            Admin Panel
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Book Store Management
          </p>
        </div>

        <nav className="flex flex-col mt-6 gap-2 px-4">
          <Link
            to="/admin/products"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition ${isActive(
              "/admin/products"
            )}`}
          >
            <GiShoppingBag className="text-2xl" />
            Products
          </Link>

          <Link
            to="/admin/orders"
            className={`flex items-center gap-4 px-4 py-3 rounded-xl text-lg font-medium transition ${isActive(
              "/admin/orders"
            )}`}
          >
            <HiMiniShoppingCart className="text-2xl" />
            Orders
          </Link>
        </nav>
      </aside>


      <main className="flex-1 p-8">
        <div className="bg-white rounded-2xl shadow-sm p-6 min-h-full">
          <Routes path="/">
            <Route
              path="/"
              element={
                <h1 className="text-3xl font-bold text-orange-600">
                  Dashboard
                </h1>
              }
            />
            <Route path="/products" element={<ProductsAdminPage />} />
            <Route path="/newProduct" element={<AddProductAdminPage />} />
            <Route path="/updateProduct" element={<UpdateProductPage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/updateOrder" element={<UpdateOrderPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}
