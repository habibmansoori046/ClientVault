import Sidebar from "../components/Sidebar"

import * as XLSX from "xlsx"
import { saveAs } from "file-saver"

import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react"

import axios from "axios"

function Customers() {

  const [customers, setCustomers] = useState([])

  const [search, setSearch] = useState("")

  const navigate = useNavigate()

  useEffect(() => {

    fetchCustomers()

  }, [])

  const fetchCustomers = async () => {

  try {

    const token = localStorage.getItem("token")

    const response = await axios.get(
      "http://localhost:5000/api/customer/all",
      {
        headers: {
          authorization: token
        }
      }
    )

    setCustomers(response.data)

  } catch (error) {

    console.log(error)

  }

}

  const filteredCustomers = customers.filter((customer) =>

    customer.name
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    customer.uin
      .toLowerCase()
      .includes(search.toLowerCase()) ||

    customer.phone.includes(search)

  )

  // EXPORT EXCEL WITH REMARKS

  const exportToExcel = async () => {

    try {

      const exportData = await Promise.all(

        customers.map(async (customer) => {

          // FETCH REMARKS

          const remarksResponse = await axios.get(
            `http://localhost:5000/api/remark/${customer._id}`
          )

          const remarks = remarksResponse.data

            .map((remark) => remark.text)

            .join(" | ")

          return {

            Name: customer.name,

            UIN: customer.uin,

            Password: customer.password,

            Phone: customer.phone,

            Remarks: remarks || "No Remarks",

            CreatedAt: new Date(
              customer.createdAt
            ).toLocaleString()

          }

        })

      )

      const worksheet =
        XLSX.utils.json_to_sheet(exportData)

      const workbook =
        XLSX.utils.book_new()

      XLSX.utils.book_append_sheet(
        workbook,
        worksheet,
        "Customers"
      )

      const excelBuffer = XLSX.write(
        workbook,
        {
          bookType: "xlsx",
          type: "array"
        }
      )

      const data = new Blob(
        [excelBuffer],
        {
          type:
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8"
        }
      )

      saveAs(
        data,
        `Customers_Backup_${Date.now()}.xlsx`
      )

    } catch (error) {

      console.log(error)

      alert("Error Exporting Excel")

    }

  }

  return (

    <div className="min-h-screen bg-slate-100 dark:bg-[#0f172a] text-slate-900 dark:text-white transition-all duration-300 flex">

      {/* Sidebar */}

      <Sidebar />

      {/* Main Content */}

      <div className="md:ml-[270px] w-full p-10">

        {/* Header */}

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">

          <div>

            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Customers
            </h1>

            <p className="text-slate-500 dark:text-slate-400 mt-2 text-lg">
              Manage and monitor all customer records
            </p>

          </div>

          <button

            onClick={exportToExcel}

            className="bg-green-600 hover:bg-green-700 text-white px-6 py-4 rounded-2xl font-semibold shadow-lg transition-all duration-300"
          >
            Download Excel
          </button>

        </div>

        {/* Search Bar */}

        <div className="mb-8">

          <input
            type="text"

            placeholder="Search by Name, UIN or Phone"

            className="
              w-full
              p-5
              rounded-2xl
              bg-white dark:bg-[#1e293b]
              border border-slate-200 dark:border-slate-700
              shadow-md
              outline-none
              text-slate-900 dark:text-white
              placeholder:text-slate-400
              focus:ring-2 focus:ring-blue-500
              transition-all duration-300
            "

            value={search}

            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* Customers Table */}

        <div className="overflow-x-auto rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800">

          <table className="w-full overflow-hidden">

            {/* Table Header */}

            <thead className="bg-slate-200 dark:bg-[#1e293b]">

              <tr>

                <th className="p-5 text-left text-lg font-bold">
                  Name
                </th>

                <th className="p-5 text-left text-lg font-bold">
                  UIN
                </th>

                <th className="p-5 text-left text-lg font-bold">
                  Password
                </th>

                <th className="p-5 text-left text-lg font-bold">
                  Phone
                </th>

              </tr>

            </thead>

            {/* Table Body */}

            <tbody className="bg-white dark:bg-[#111827]">

              {

                filteredCustomers.length > 0 ? (

                  filteredCustomers.map((customer) => (

                    <tr

                      key={customer._id}

                      onClick={() =>
                        navigate(
                          `/customer/${customer._id}`
                        )
                      }

                      className="
                        border-b border-slate-200 dark:border-slate-800
                        cursor-pointer
                        hover:bg-slate-100 dark:hover:bg-slate-800
                        transition-all duration-200
                      "
                    >

                      <td className="p-5 font-medium">
                        {customer.name}
                      </td>

                      <td className="p-5">
                        {customer.uin}
                      </td>

                      <td className="p-5">
                        {customer.password}
                      </td>

                      <td className="p-5">
                        {customer.phone}
                      </td>

                    </tr>

                  ))

                ) : (

                  <tr>

                    <td
                      colSpan="4"
                      className="text-center p-5 md:p-10 text-slate-500 dark:text-slate-400 text-lg"
                    >
                      No customers found
                    </td>

                  </tr>

                )

              }

            </tbody>

          </table>

        </div>

      </div>

    </div>

  )

}

export default Customers