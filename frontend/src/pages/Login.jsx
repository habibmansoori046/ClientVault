import { useState } from "react"

import axios from "axios"

import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [username, setUsername] = useState("")

  const [password, setPassword] = useState("")

  const loginAdmin = async () => {

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password
        }
      )

      localStorage.setItem(
        "token",
        response.data.token
      )

      alert("Login Successful")

      navigate("/customers")

    } catch (error) {

      console.log(error)

      alert("Invalid Credentials")

    }

  }

  return (

    <div className="h-screen flex items-center justify-center bg-gray-900">

      <div className="bg-gray-800 p-10 rounded-2xl w-[400px]">

        <h1 className="text-white text-3xl font-bold text-center mb-8">
          ClientVault Login
        </h1>

        <input
          type="text"
          placeholder="Admin ID"

          className="w-full p-3 rounded-lg mb-4 bg-gray-700 text-white outline-none"

          value={username}

          onChange={(e) =>
            setUsername(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"

          className="w-full p-3 rounded-lg mb-6 bg-gray-700 text-white outline-none"

          value={password}

          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button

          onClick={loginAdmin}

          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-semibold"
        >
          Login
        </button>

      </div>

    </div>
  )
}

export default Login