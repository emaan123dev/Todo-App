import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:1000/api/v1/signin",
        {
          email,
          password,
        }
      );

      alert(res.data.message);

      // user data store (optional)
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // redirecta to add task page
      navigate("/AddTask");
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
          SignIn
        </h1>

        <div className="w-[440px] mb-6">
          <label className="block text-2xl font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-[440px] h-[70px] bg-white rounded-xl px-6 text-lg outline-none"
          />
        </div>

        <div className="w-[440px]">
          <label className="block text-2xl font-medium mb-2">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-[440px] h-[70px] bg-white rounded-xl px-6 text-lg outline-none"
          />
        </div>

        <button
          onClick={handleSignIn}
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
          SignIn
        </button>

      </div>
    </div>
  );
}

export default SignIn;