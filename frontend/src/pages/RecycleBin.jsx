import { useEffect, useState } from "react"

import { useNavigate } from "react-router-dom"

import axios from "axios"

function RecycleBin() {

  const navigate = useNavigate()

  const [customers, setCustomers] = useState([])

  useEffect(() => {

    fetchDeletedCustomers()

  }, [])

  const fetchDeletedCustomers = async () => {

    try {

      const response = await axios.get(
        "https://clientvault-backend.onrender.com/api/customer/deleted/all"
      )

      setCustomers(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  const restoreCustomer = async (id) => {

    try {

      await axios.put(
        `https://clientvault-backend.onrender.com/api/customer/restore/${id}`
      )

      fetchDeletedCustomers()

      alert("Customer Restored")

    } catch (error) {

      console.log(error)

    }

  }

  const permanentDelete = async (id) => {

    const confirmDelete = window.confirm(
      "Permanently delete customer?"
    )

    if (!confirmDelete) return

    try {

      await axios.delete(
        `https://clientvault-backend.onrender.com/api/customer/permanent/${id}`
      )

      fetchDeletedCustomers()

      alert("Customer Permanently Deleted")

    } catch (error) {

      console.log(error)

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
        Recycle Bin
      </h1>

      <div className="grid gap-5">

        {

          customers.length > 0 ? (

            customers.map((customer) => (

              <div

                key={customer._id}

                className="bg-gray-800 p-6 rounded-2xl"
              >

                <h2 className="text-2xl font-bold mb-3">
                  {customer.name}
                </h2>

                <p className="mb-2">
                  UIN: {customer.uin}
                </p>

                <p className="mb-5">
                  Phone: {customer.phone}
                </p>

                <div className="flex gap-4">

                  <button

                    onClick={() =>
                      restoreCustomer(customer._id)
                    }

                    className="bg-green-600 hover:bg-green-700 px-5 py-2 rounded-lg"
                  >
                    Restore
                  </button>

                  <button

                    onClick={() =>
                      permanentDelete(customer._id)
                    }

                    className="bg-red-600 hover:bg-red-700 px-5 py-2 rounded-lg"
                  >
                    Permanent Delete
                  </button>

                </div>

              </div>

            ))

          ) : (

            <div className="bg-gray-800 p-8 rounded-2xl text-center text-gray-400">

              No deleted customers found

            </div>

          )

        }

      </div>

    </div>

  )
}

export default RecycleBin