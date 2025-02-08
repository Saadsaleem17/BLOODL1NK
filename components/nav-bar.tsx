import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NavBar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-blood-800 text-2xl font-bold">BLOODL1NK</span>
        </Link>

        <div className="flex gap-4">
          <Link href="/">
            <Button variant="ghost" className="text-blood-800 hover:text-blood-600">
              HOME
            </Button>
          </Link>
          <Link href="/signup">
            <Button variant="secondary" className="bg-blood-600 text-white hover:bg-blood-700">
              Sign Up
            </Button>
          </Link>
          <Link href="/login">
            <Button variant="secondary" className="bg-blood-800 text-white hover:bg-blood-700">
              Log In
            </Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}

