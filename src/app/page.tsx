export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-6 py-20">
        <div className="text-center text-white">
          <h1 className="text-6xl font-bold mb-6">
            Uplab Digital Agency
          </h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Transform your digital presence with exceptional web development, 
            mobile apps, and digital marketing services.
          </p>
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Coming Soon</h2>
            <p className="text-lg">
              Our website is being optimized for the best experience. 
              Please check back soon!
            </p>
            <div className="mt-6">
              <a 
                href="mailto:Himanshurai114@gmail.com" 
                className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-8 rounded-full transition-all duration-300"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
