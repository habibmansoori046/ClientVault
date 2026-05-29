import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import RecycleBin from "./pages/RecycleBin"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import CustomerDetails from "./pages/CustomerDetails"
import Login from "./pages/Login"
import AddCustomer from "./pages/AddCustomer"
import Customers from "./pages/Customers"

function App() {

  return (

    <BrowserRouter>

      <Routes>

  <Route path="/" element={<Login />} />

  <Route

    path="/customers"

    element={
      <ProtectedRoute>
        <Customers />
      </ProtectedRoute>
    }
  />

  <Route

  path="/dashboard"

  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  }
/>

  <Route

    path="/add-customer"

    element={
      <ProtectedRoute>
        <AddCustomer />
      </ProtectedRoute>
    }
  />

  <Route

    path="/customer/:id"

    element={
      <ProtectedRoute>
        <CustomerDetails />
      </ProtectedRoute>
    }
  />

  <Route

    path="/recycle-bin"

    element={
      <ProtectedRoute>
        <RecycleBin />
      </ProtectedRoute>
    }
  />

</Routes>

    </BrowserRouter>

  )
}

export default App