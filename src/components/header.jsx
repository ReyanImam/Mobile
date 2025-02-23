import { useState, useEffect } from "react"
import { Moon, Sun, Home, Phone, ShoppingCart, User, Menu, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { NavLink } from "react-router-dom"

export default function Header({ theme, setTheme }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  const navItems = [
    { name: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
    { name: "Products", icon: <Smartphone className="w-4 h-4" />, href: "/products" },
    { name: "Cart", icon: <ShoppingCart className="w-4 h-4" />, href: "/cart" },
  ]

  return (
    <header className="fixed w-full top-0 z-50 border-b bg-background">
      <div className="flex items-center justify-between h-16 px-6 md:px-8">
        {/* Logo Section */}
        <NavLink to="/" className="flex items-center space-x-2">
          <Phone className="w-6 h-6 text-primary" />
          <span className="text-xl font-bold text-primary">MobiTrek</span>
        </NavLink>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center justify-center flex-1 px-8">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className={({ isActive }) =>
                `mx-4 py-2 text-sm font-medium transition-colors flex items-center ${
                  isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
                }`
              }
            >
              {item.icon}
              <span className="ml-2">{item.name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          {mounted && (
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden md:flex">
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}

          <div className="hidden md:flex items-center space-x-2">
            <Button variant="ghost" asChild>
              <NavLink to="/login">Login</NavLink>
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90" asChild>
              <NavLink to="/register">Account</NavLink>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="flex flex-col space-y-4 mt-4">
                {navItems.map((item) => (
                  <NavLink
                    key={item.name}
                    to={item.href}
                    className={({ isActive }) =>
                      `flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                      }`
                    }
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </NavLink>
                ))}
                <Button variant="ghost" onClick={toggleTheme} className="justify-start">
                  {theme === "dark" ? (
                    <>
                      <Sun className="h-5 w-5 mr-2" /> Light Mode
                    </>
                  ) : (
                    <>
                      <Moon className="h-5 w-5 mr-2" /> Dark Mode
                    </>
                  )}
                </Button>
                <Button variant="ghost" asChild className="justify-start">
                  <NavLink to="/login">Login</NavLink>
                </Button>
                <Button className="justify-start" asChild>
                  <NavLink to="/register">Account</NavLink>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

