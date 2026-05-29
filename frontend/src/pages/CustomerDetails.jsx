import { useEffect, useState } from "react"
import axios from "axios"
import { useParams } from "react-router-dom"

function CustomerDetails() {

  const { id } = useParams()

  const [customer, setCustomer] = useState(null)

  const [remark, setRemark] = useState("")

  const [remarks, setRemarks] = useState([])

  const [editPhone, setEditPhone] = useState("")

  const [editPassword, setEditPassword] = useState("")

  const [showPhoneEdit, setShowPhoneEdit] = useState(false)

  const [showPasswordEdit, setShowPasswordEdit] = useState(false)

  useEffect(() => {

    fetchCustomer()

    fetchRemarks()

  }, [])

  const fetchCustomer = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/customer/${id}`
      )

      setCustomer(response.data)

      setEditPhone(response.data.phone)

      setEditPassword(response.data.password)

    } catch (error) {

      console.log(error)

    }

  }

  const fetchRemarks = async () => {

    try {

      const response = await axios.get(
        `http://localhost:5000/api/remark/${id}`
      )

      setRemarks(response.data)

    } catch (error) {

      console.log(error)

    }

  }

  const addRemark = async () => {

    if (!remark.trim()) return

    try {

      const response = await axios.post(
        "http://localhost:5000/api/remark/add",
        {
          customerId: id,
          text: remark
        }
      )

      setRemarks((prev) => [...prev, response.data])

      setRemark("")

    } catch (error) {

      console.log(error)

      alert("Error saving remark")

    }

  }

  const updateCustomer = async () => {

    try {

      const response = await axios.put(
        `http://localhost:5000/api/customer/update/${id}`,
        {
          phone: editPhone,
          password: editPassword
        }
      )

      setCustomer(response.data)

      setShowPhoneEdit(false)

      setShowPasswordEdit(false)

      alert("Customer Updated Successfully")

    } catch (error) {

      console.log(error)

    }

  }

  const deleteCustomer = async () => {

  const confirmDelete = window.confirm(
    "Move customer to recycle bin?"
  )

  if (!confirmDelete) return

  try {

    await axios.put(
      `http://localhost:5000/api/customer/delete/${id}`
    )

    alert("Customer moved to recycle bin")

    window.location.href = "/customers"

  } catch (error) {

    console.log(error)

  }

}

  if (!customer) {

    return (
      <div className="text-white p-10">
        Loading...
      </div>
    )

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white p-10">

      <h1 className="text-4xl font-bold mb-10">
        Customer Details
      </h1>

      {/* Customer Info */}

      <div className="bg-gray-800 p-8 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-8">
          {customer.name}
        </h2>

        <p className="mb-5">
          <strong>UIN:</strong> {customer.uin}
        </p>

        {/* Password Section */}

        <div className="mb-6">

          <div className="flex items-center justify-between">

            <p>
              <strong>Password:</strong> {customer.password}
            </p>

            <button

              onClick={() =>
                setShowPasswordEdit(!showPasswordEdit)
              }

              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm"
            >
              Change Password
            </button>

          </div>

          {

            showPasswordEdit && (

              <div className="mt-4 flex gap-3">

                <input
                  type="text"
                  placeholder="New Password"

                  className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"

                  value={editPassword}

                  onChange={(e) =>
                    setEditPassword(e.target.value)
                  }
                />

                <button

                  onClick={updateCustomer}

                  className="bg-green-600 hover:bg-green-700 px-5 rounded-lg"
                >
                  Save
                </button>

              </div>

            )

          }

        </div>

        {/* Phone Section */}

        <div>

          <div className="flex items-center justify-between">

            <p>
              <strong>Phone:</strong> {customer.phone}
            </p>

            <button

              onClick={() =>
                setShowPhoneEdit(!showPhoneEdit)
              }

              className="bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded-lg text-sm"
            >
              Change Phone
            </button>

          </div>

          {

            showPhoneEdit && (

              <div className="mt-4 flex gap-3">

                <input
                  type="text"
                  placeholder="New Phone"

                  className="flex-1 p-3 rounded-lg bg-gray-700 outline-none"

                  value={editPhone}

                  onChange={(e) =>
                    setEditPhone(e.target.value)
                  }
                />

                <button

                  onClick={updateCustomer}

                  className="bg-green-600 hover:bg-green-700 px-5 rounded-lg"
                >
                  Save
                </button>

              </div>

            )

          }

        </div>

      </div>
      
      <div className="mb-10">

  <button

    onClick={deleteCustomer}

    className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg"
  >
    Delete Customer
  </button>

</div>

      {/* Add Remark */}

      <div className="bg-gray-800 p-8 rounded-2xl mb-10">

        <h2 className="text-2xl font-bold mb-5">
          Add Remark
        </h2>

        <textarea
          placeholder="Write remark..."
          className="w-full p-4 rounded-lg bg-gray-700 outline-none h-32"

          value={remark}

          onChange={(e) => setRemark(e.target.value)}
        />

        <button

          onClick={addRemark}

          className="mt-5 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-lg"
        >
          Add Remark
        </button>

      </div>

      {/* Remarks Timeline */}

      <div className="bg-gray-800 p-8 rounded-2xl">

        <h2 className="text-2xl font-bold mb-5">
          Remarks History
        </h2>

        {

          remarks.length > 0 ? (

            remarks.map((item, index) => (

              <div
                key={index}
                className="bg-gray-700 p-4 rounded-lg mb-4"
              >

                <p className="mb-2">
                  {item.text}
                </p>

                <small className="text-gray-300">

                  {
                    item.createdAt
                      ? new Date(item.createdAt).toLocaleString()
                      : "Just now"
                  }

                </small>

              </div>

            ))

          ) : (

            <p className="text-gray-400">
              No remarks added yet
            </p>

          )

        }

      </div>

    </div>

  )
}

export default CustomerDetails