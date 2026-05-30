import { useNavigate } from "react-router-dom"
import { useState } from "react"
import axios from "axios"
import toast from "react-hot-toast"

function AddCustomer() {

  const navigate = useNavigate()

  const [customer, setCustomer] = useState({
    name: "",
    uin: "",
    password: "",
    phone: ""
  })

  const saveCustomer = async () => {

    try {

      const token = localStorage.getItem("token")

await axios.post(
  "https://clientvault-backend.onrender.com/api/customer/create",
  customer,
  {
    headers: {
      authorization: token
    }
  }
)

      console.log(response.data)

      toast.success("Customer Saved Successfully")

      navigate("/customers")

    } catch (error) {

      console.log(error)

      alert("Error Saving Customer")

    }

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white p-10">

      {/* Back Button */}

      <button

        onClick={() => navigate(-1)}

        className="bg-gray-700 hover:bg-gray-600 px-5 py-2 rounded-lg mb-6"
      >
        ← Back
      </button>

      <h1 className="text-4xl font-bold mb-10">
        Add Customer
      </h1>

      <div className="bg-gray-800 p-8 rounded-2xl max-w-2xl">

        {/* Name */}

        <div className="mb-5">

          <label className="block mb-2">
            Customer Name
          </label>

          <input
            type="text"
            placeholder="Enter customer name"

            className="w-full p-3 rounded-lg bg-gray-700 outline-none"

            value={customer.name}

            onChange={(e) =>
              setCustomer({
                ...customer,
                name: e.target.value
              })
            }
          />

        </div>

        {/* UIN */}

        <div className="mb-5">

          <label className="block mb-2">
            UIN Number
          </label>

          <input
            type="text"
            placeholder="Enter UIN number"

            className="w-full p-3 rounded-lg bg-gray-700 outline-none"

            value={customer.uin}

            onChange={(e) =>
              setCustomer({
                ...customer,
                uin: e.target.value
              })
            }
          />

        </div>

        {/* Password */}

        <div className="mb-5">

          <label className="block mb-2">
            Password
          </label>

          <input
            type="text"
            placeholder="Enter password"

            className="w-full p-3 rounded-lg bg-gray-700 outline-none"

            value={customer.password}

            onChange={(e) =>
              setCustomer({
                ...customer,
                password: e.target.value
              })
            }
          />

        </div>

        {/* Phone */}

        <div className="mb-8">

          <label className="block mb-2">
            Phone Number
          </label>

          <input
            type="text"
            placeholder="Enter phone number"

            className="w-full p-3 rounded-lg bg-gray-700 outline-none"

            value={customer.phone}

            onChange={(e) =>
              setCustomer({
                ...customer,
                phone: e.target.value
              })
            }
          />

        </div>

        {/* Save Button */}

        <button

          onClick={saveCustomer}

          className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg font-semibold"
        >
          Save Customer
        </button>

      </div>

    </div>

  )
}

export default AddCustomer