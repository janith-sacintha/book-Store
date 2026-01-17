import { BiCart, BiShoppingBag, BiUser } from "react-icons/bi"
import { Link } from "react-router-dom"

export default function Header() {
  return (
    <header className="h-20 bg-gradient-to-r from-orange-500 to-orange-600 text-white sticky top-0 z-30 shadow-lg">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-8">
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition"
          >
            itoya
          </Link>
          <nav className="hidden md:flex gap-6 font-medium text-lg">
            <Link
              to="/products"
              className="hover:text-yellow-200 transition"
            >
              Products
            </Link>
            
            <Link
              to="/about-us"
              className="hover:text-yellow-200 transition"
            >
              About Us
            </Link>
            
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <Link
            to="/register"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-orange-600 hover:bg-yellow-200 transition"
          >
            <BiUser size={22} />
          </Link>

          <Link
            to="/my-orders"
            className="flex items-center gap-2 bg-yellow-400 text-blue-800 font-semibold px-4 py-2 rounded-lg hover:bg-yellow-300 transition"
          >
            <span>My Orders</span>
            <BiShoppingBag size={22} />
          </Link>

          <Link
            to="/cart"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-yellow-400 text-blue-800 hover:bg-yellow-300 transition"
          >
            <BiCart size={22} />
            
          </Link>
        </div>
      </div>
    </header>
  )
}
