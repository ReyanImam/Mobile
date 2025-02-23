import { useState } from "react"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Heart, ShoppingCart, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { useCart } from "./contexts/CartContext"
import { CartIcon } from "@/components/cart-icon"

// Categories for the sidebar
const categories = [
  {
    title: "Browse By Brand",
    items: ["iPhone", "Samsung", "Infinix", "Tecno", "Xiaomi", "Oppo", "Vivo", "All Brands"],
  },
  {
    title: "Your Preferences",
    items: ["Recently Viewed", "Your Wishlist", "Recommended"],
  },
  {
    title: "By Price Range",
    items: ["Under $300", "$300 - $500", "$500 - $800", "Above $800"],
  },
]

// Extended phone data with all companies and real images
const phones = {
  iPhone: [
    {
      id: 1,
      name: "iPhone 15 Pro",
      price: "$999",
      image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 2,
      name: "iPhone 15",
      price: "$799",
      image: "https://images.unsplash.com/photo-1695048094027-9363404d85b4?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 3,
      name: "iPhone 14 Pro",
      price: "$899",
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 4,
      name: "iPhone 14",
      price: "$699",
      image: "https://images.unsplash.com/photo-1678685888435-4a469db3f0b0?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Samsung: [
    {
      id: 5,
      name: "Galaxy S23 Ultra",
      price: "$1199",
      image: "https://images.unsplash.com/photo-1678685888221-cda773a3dcdb?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 6,
      name: "Galaxy S23+",
      price: "$999",
      image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 7,
      name: "Galaxy Z Fold 5",
      price: "$1799",
      image: "https://images.unsplash.com/photo-1628281321655-060c5fb662c5?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Infinix: [
    {
      id: 8,
      name: "Note 30 Pro",
      price: "$299",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 9,
      name: "Zero 30",
      price: "$399",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 10,
      name: "Hot 30",
      price: "$199",
      image: "https://images.unsplash.com/photo-1533228876829-65c94e7b5025?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Tecno: [
    {
      id: 11,
      name: "Phantom X2 Pro",
      price: "$599",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 12,
      name: "Camon 20 Pro",
      price: "$299",
      image: "https://images.unsplash.com/photo-1616348436168-de43ad0db179?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Xiaomi: [
    {
      id: 13,
      name: "13T Pro",
      price: "$699",
      image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 14,
      name: "Redmi Note 12 Pro",
      price: "$299",
      image: "https://images.unsplash.com/photo-1546054454-aa26e2b734c7?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Oppo: [
    {
      id: 15,
      name: "Find X6 Pro",
      price: "$899",
      image: "https://images.unsplash.com/photo-1584006682522-dc17d6c0d9ac?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 16,
      name: "Reno 10 Pro",
      price: "$599",
      image: "https://images.unsplash.com/photo-1551355738-1875b6664915?auto=format&fit=crop&w=800&q=80",
    },
  ],
  Vivo: [
    {
      id: 17,
      name: "X90 Pro",
      price: "$799",
      image: "https://images.unsplash.com/photo-1605236453806-6ff36851218e?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: 18,
      name: "V29 Pro",
      price: "$499",
      image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?auto=format&fit=crop&w=800&q=80",
    },
  ],
}

export default function Products() {
  const [activeCategory, setActiveCategory] = useState("Browse By Brand")
  const { addToCart } = useCart()
  const [addedItems, setAddedItems] = useState({})

  const displayPhones = () => {
    if (activeCategory === "Browse By Brand" || activeCategory === "All Brands") {
      return Object.entries(phones)
    } else if (phones[activeCategory]) {
      return [[activeCategory, phones[activeCategory]]]
    }
    return []
  }

  return (
    <div className="container mx-auto pt-20">
      <div className="flex justify-end mb-4 px-4">
        <CartIcon />
      </div>
      <div className="flex flex-col md:flex-row gap-6 p-4">
        {/* Sidebar */}
        <aside className="w-full md:w-64 shrink-0">
          <Card className="sticky top-24">
            <CardContent className="p-4">
              {categories.map((category) => (
                <div key={category.title} className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground mb-2">{category.title}</h3>
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <Button
                        key={item}
                        variant="ghost"
                        className={cn("w-full justify-start text-sm", activeCategory === item && "bg-accent")}
                        onClick={() => setActiveCategory(item)}
                      >
                        {item}
                      </Button>
                    ))}
                  </div>
                  <Separator className="my-4" />
                </div>
              ))}
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-6">
          {displayPhones().map(([brand, brandPhones]) => (
            <section key={brand} className="space-y-4">
              <h2 className="text-2xl font-bold">{brand}</h2>
              <ScrollArea className="w-full whitespace-nowrap">
                <div className="flex w-max space-x-4 p-1">
                  {brandPhones.map((phone) => (
                    <Card key={phone.id} className="w-[280px] shrink-0">
                      <CardHeader className="p-0">
                        <div className="aspect-square relative overflow-hidden rounded-t-lg">
                          <img
                            src={phone.image}
                            alt={phone.name}
                            className="object-cover w-full h-full transition-transform hover:scale-105"
                          />
                          <Button
                            size="icon"
                            variant="ghost"
                            className="absolute top-2 right-2 bg-background/40 backdrop-blur-sm hover:bg-background/60"
                          >
                            <Heart className="w-5 h-5" />
                          </Button>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <CardTitle className="text-lg">{phone.name}</CardTitle>
                        <p className="text-xl font-bold mt-2">{phone.price}</p>
                      </CardContent>
                      <CardFooter className="p-4 pt-0">
                        <Button
                          className="w-full"
                          size="sm"
                          onClick={() => {
                            addToCart({
                              id: phone.id,
                              name: phone.name,
                              price: phone.price,
                              image: phone.image,
                              quantity: 1,
                            })
                            setAddedItems((prev) => ({ ...prev, [phone.id]: true }))
                            setTimeout(() => setAddedItems((prev) => ({ ...prev, [phone.id]: false })), 2000)
                          }}
                        >
                          {addedItems[phone.id] ? (
                            <>
                              <Check className="w-4 h-4 mr-2" />
                              Added to Cart
                            </>
                          ) : (
                            <>
                              <ShoppingCart className="w-4 h-4 mr-2" />
                              Add to Cart
                            </>
                          )}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>
            </section>
          ))}
        </main>
      </div>
    </div>
  )
}