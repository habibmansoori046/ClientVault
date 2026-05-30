import { useEffect, useState } from "react"
import axios from "axios"
import Sidebar from "../components/Sidebar"

function Dashboard() {

  const [totalCustomers, setTotalCustomers] = useState(0)
  const [deletedCustomers, setDeletedCustomers] = useState(0)
  const [totalRemarks, setTotalRemarks] = useState(0)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {

    try {

      const token = localStorage.getItem("token")

      const customersResponse = await axios.get(
        "https://clientvault-backend.onrender.com/api/customer/all",
        {
          headers: {
            authorization: token
          }
        }
      )

      setTotalCustomers(customersResponse.data.length)

      const deletedResponse = await axios.get(
        "https://clientvault-backend.onrender.com/api/customer/deleted/all",
        {
          headers: {
            authorization: token
          }
        }
      )

      setDeletedCustomers(deletedResponse.data.length)

      let remarksCount = 0

      for (const customer of customersResponse.data) {

        const remarksResponse = await axios.get(
          `https://clientvault-backend.onrender.com/api/remark/${customer._id}`,
          {
            headers: {
              authorization: token
            }
          }
        )

        remarksCount += remarksResponse.data.length

      }

      setTotalRemarks(remarksCount)

    } catch (error) {

      console.log(error)

    }

  }

  return (

    <div className="min-h-screen bg-gray-900 text-white flex">

      <Sidebar />

      <div className="ml-[250px] w-full p-10">

        <h1 className="text-5xl font-bold mb-10">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="bg-blue-600 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Total Customers
            </h2>
            <p className="text-5xl font-bold">
              {totalCustomers}
            </p>
          </div>

          <div className="bg-red-600 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Deleted Customers
            </h2>
            <p className="text-5xl font-bold">
              {deletedCustomers}
            </p>
          </div>

          <div className="bg-green-600 p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">
              Total Remarks
            </h2>
            <p className="text-5xl font-bold">
              {totalRemarks}
            </p>
          </div>

        </div>

      </div>

    </div>

  )

}

export default Dashboard