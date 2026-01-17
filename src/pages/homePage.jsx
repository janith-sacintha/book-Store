import { Link } from "react-router-dom"
import { FiShoppingCart } from "react-icons/fi"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex flex-col">
      
      <main className="flex-1 flex items-center justify-center text-center px-6">
        <div className="max-w-xl">
          <h2 className="text-4xl font-bold mb-4">
            Find Your Next Book
          </h2>

          <p className="text-gray-600 mb-8 leading-relaxed">
            A simple online bookstore where you can explore books,
            discover new authors, and enjoy reading every day.
          </p>

          <Link
            to="/products"
            className="inline-block px-6 py-3 rounded-lg bg-indigo-600 text-white font-medium hover:bg-indigo-500 transition"
          >
            Browse Books
          </Link>
        </div>
      </main>

    </div>
  )
}
