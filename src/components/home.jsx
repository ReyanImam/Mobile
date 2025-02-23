"use client"

import { useRef, Suspense, useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import { PresentationControls, Environment, Float } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { Phone3D } from "./phone-3d"
import myImage from "../Fly.png"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { Link, useLocation } from "react-router-dom"
import { Sun, Moon } from "lucide-react"

const navItems = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
]

export default function Home() {
  const containerRef = useRef()
  const [isOpen, setIsOpen] = useState(false)
  const [theme, setTheme] = useState("dark")
  const location = useLocation()
  const [phraseIndex, setPhraseIndex] = useState(0)

  const phrases = [
    "Experience The Future of Mobile",
    "Unleash Cutting-Edge Technology",
    "Redefine Your Digital Lifestyle",
    "Embrace Innovation at Your Fingertips",
    "Elevate Your Mobile Experience",
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const handleOptionSelect = () => {
    setIsOpen(false)
  }

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"))
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section
        className="h-screen relative flex items-center justify-center"
        style={{
          backgroundImage: `url(${myImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/50 to-background" />

        <div className="container px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Next Generation Mobile Experience
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-[#4A3428] dark:text-gray-200 font-medium">
              Discover our latest collection of premium smartphones
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Buy Now
              </Button>
              <Button size="lg" variant="outline" className="text-base sm:text-lg px-6 sm:px-8 w-full sm:w-auto">
                Login
              </Button>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <div className="animate-bounce">
            <div className="text-sm text-center">Scroll Down</div>
          </div>
        </motion.div>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="absolute top-4 right-4 md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <div className="flex flex-col space-y-4 mt-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={handleOptionSelect}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md transition-colors ${
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
              <Button
                variant="ghost"
                onClick={() => {
                  toggleTheme()
                  handleOptionSelect()
                }}
                className="justify-start"
              >
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
              <Button variant="ghost" asChild className="justify-start" onClick={handleOptionSelect}>
                <Link to="/login">Login</Link>
              </Button>
              <Button className="justify-start" asChild onClick={handleOptionSelect}>
                <Link to="/account">Account</Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </section>

      {/* 3D Phone Section */}
      <section className="h-screen bg-gradient-to-b from-background to-background/50 relative overflow-hidden">
        <div className="absolute inset-0">
          <Canvas>
            <Suspense fallback={null}>
              <PresentationControls
                global
                rotation={[0.13, 0.1, 0]}
                polar={[-0.4, 0.2]}
                azimuth={[-1, 0.75]}
                config={{ mass: 2, tension: 400 }}
                snap={{ mass: 4, tension: 400 }}
              >
                <Float rotationIntensity={0.4}>
                  <Phone3D />
                </Float>
              </PresentationControls>
              <Environment preset="city" />
            </Suspense>
          </Canvas>
        </div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center justify-center text-center max-w-5xl mx-auto">
              <div className="min-h-[80px] sm:min-h-[100px] md:min-h-[120px] w-full flex items-center justify-center mb-4 relative">
                <AnimatePresence mode="wait">
                  <motion.h2
                    key={phraseIndex}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold px-4 sm:px-6 md:px-8"
                  >
                    {phrases[phraseIndex]}
                  </motion.h2>
                </AnimatePresence>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-base sm:text-lg md:text-xl text-[#6B4F3F] dark:text-gray-300 max-w-3xl mx-auto px-4 sm:px-6"
              >
                Where Innovation Meets Excellence - Transforming the Way You Connect with the World
              </motion.p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

