import { Link, useNavigate, useLocation } from "react-router-dom"

import { useContext } from "react"

import { ThemeContext } from "../context/ThemeContext"

function Sidebar() {

  const navigate = useNavigate()

  const location = useLocation()

  const { darkMode, setDarkMode } = useContext(ThemeContext)

  const logout = () => {

    localStorage.removeItem("token")

    navigate("/")

  }

  const menuItems = [

    {
      name: "Dashboard",
      path: "/dashboard",
      icon: "📊"
    },

    {
      name: "Customers",
      path: "/customers",
      icon: "👥"
    },

    {
      name: "Add Customer",
      path: "/add-customer",
      icon: "➕"
    },

    {
      name: "Recycle Bin",
      path: "/recycle-bin",
      icon: "🗑️"
    }

  ]

  return (

    <div className="

  w-full
  md:w-[270px]

  h-auto
  md:h-screen

  bg-gradient-to-b
  from-gray-950
  via-gray-900
  to-black

  text-white

  p-6

  md:fixed
  left-0
  top-0

  flex
  flex-col
  justify-between

  border-r
  border-gray-800

  shadow-2xl

">

      {/* Top Section */}

      <div>

        {/* Logo */}

        <div className="mb-12">

          <h1 className="text-4xl font-extrabold text-blue-500 tracking-wide">
            ClientVault
          </h1>

          <p className="text-gray-400 mt-2 text-sm">
            Smart CRM Dashboard
          </p>

        </div>

        {/* Navigation */}

        <div className="flex flex-col gap-4">

          {

            menuItems.map((item) => (

              <Link

                key={item.path}

                to={item.path}

                className={`

                  flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 text-lg font-medium

                  ${
                    location.pathname === item.path

                      ? "bg-blue-600 shadow-lg shadow-blue-600/30"

                      : "bg-gray-800 hover:bg-gray-700"
                  }

                `}
              >

                <span className="text-2xl">
                  {item.icon}
                </span>

                {item.name}

              </Link>

            ))

          }

        </div>

      </div>

      {/* Bottom Section */}

      <div className="flex flex-col gap-4">

        {/* Theme Toggle */}

        <button

          onClick={() =>
            setDarkMode(!darkMode)
          }

          className="bg-yellow-500 hover:bg-yellow-600 p-4 rounded-2xl font-semibold transition text-black"
        >

          {
            darkMode
              ? "☀️ Light Mode"
              : "🌙 Dark Mode"
          }

        </button>

        {/* Logout */}

        <button

          onClick={logout}

          className="bg-red-600 hover:bg-red-700 p-4 rounded-2xl font-semibold transition"
        >
          Logout
        </button>

        {/* Footer */}

        <p className="text-center text-gray-500 text-sm mt-2">
          ClientVault CRM v1.0
        </p>

      </div>

    </div>

  )
}

export default Sidebar