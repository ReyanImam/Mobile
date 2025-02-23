import { useState, useEffect } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import Header from "./components/header"
import Home from "./components/home"
import Products from "./components/Products"
import Footer from "./components/footer"
import Cart from "./components/cart"
import Login from "./components/login"
import Register from "./components/register"
import { CartProvider } from "./components/contexts/CartContext"
import { AuthProvider } from "./components/contexts/AuthContext"

export default function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") || "dark"
    }
    return "dark"
  })

  useEffect(() => {
    document.documentElement.className = theme
    document.body.className = theme
  }, [theme])

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div className={`min-h-screen bg-background text-foreground ${theme}`}>
            <Header theme={theme} setTheme={setTheme} />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/* Add more routes as needed */}
            </Routes>
            <Footer />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  )
}

