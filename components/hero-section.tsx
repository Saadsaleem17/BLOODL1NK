export default function HeroSection() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage:
          "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/book%20now%20%E2%86%92%20(4)-0fmc9LeYaD4TJMS24YD2Ma39v78hng.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-white/90 to-transparent" />

      <div className="container mx-auto px-4 pt-32 flex items-center min-h-screen relative">
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="text-6xl md:text-7xl font-bold text-blood-800">Welcome</h1>
          <h2 className="text-3xl md:text-4xl font-bold text-blood-600">TO BLOODL1NK</h2>
          <p className="text-blood-700 text-lg max-w-md">
            Connecting hospitals and donors to save lives through efficient blood donation management.
          </p>
        </div>
      </div>
    </div>
  )
}

