import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Signup() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/register",
        {
          username,
          email,
          password,
        }
      );

      alert(res.data.message);

      navigate("/signin"); // 👈 better redirect
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] flex justify-center items-center">
      <div className="w-[580px] bg-[#e9e9e9] rounded-2xl flex flex-col items-center py-10">

        <h1 className="text-4xl font-bold mb-10">
          Signup
        </h1>

        {/* Username */}
        <div className="w-[440px] mb-6">
          <label className="block text-2xl font-medium mb-2">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-[440px] h-[70px] bg-white rounded-xl px-6 text-lg outline-none"
          />
        </div>

        {/* Email */}
        <div className="w-[440px] mb-6">
          <label className="block text-2xl font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-[440px] h-[70px] bg-white rounded-xl px-6 text-lg outline-none"
          />
        </div>

        {/* Password */}
        <div className="w-[440px]">
          <label className="block text-2xl font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-[440px] h-[70px] bg-white rounded-xl px-6 text-lg outline-none"
          />
        </div>

        {/* Signup Button */}
        <button
          onClick={handleSignup}
          className="
            mt-10
            w-[220px]
            h-[65px]
            bg-[#d9d9d9]
            rounded-xl
            text-2xl
            font-bold
            hover:bg-gray-300
            transition
            cursor-pointer
          "
        >
          Signup
        </button>

        {/* 👇 NEW SIGNIN BUTTON */}
        <p className="mt-6 text-sm">
          Already have an account?
        </p>

        <button
          onClick={() => navigate("/signin")}
          className="mt-2 text-blue-600 font-semibold hover:underline"
        >
          Go to SignIn
        </button>

      </div>
    </div>
  );
}

export default Signup;