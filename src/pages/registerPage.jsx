import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function register() {
    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/users/`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed, try again!");
    }
  }

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-5">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-orange-600">Create Account</h1>
          <p className="text-gray-500 mt-2">
            Sign up to get started
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <input
            type="text"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
          <input
            type="text"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
            className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
          />
        </div>

        <input
          type="email"
          placeholder="Email address"
          onChange={(e) => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-400 focus:outline-none"
        />

        <button
          onClick={register}
          className="cursor-pointer w-full py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition"
        >
          Register
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-orange-500 font-semibold hover:underline"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
