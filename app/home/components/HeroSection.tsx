import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-600/5 to-emerald-600/5"></div>

      <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-6 mb-8 sm:mb-10 md:mb-12">
        {["🤞", "🫰", "🤏", "🙌", "🤙"].map((i) => (
          <div key={i} className="group">
            <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-white rounded-xl sm:rounded-2xl shadow-lg flex items-center justify-center border border-teal-100 group-hover:shadow-xl group-hover:shadow-teal-500/20 transition-all duration-300 transform group-hover:scale-110">
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16 bg-gradient-to-br from-teal-500 to-emerald-600 rounded-lg sm:rounded-xl flex items-center justify-center">
                <span className="text-white text-lg sm:text-xl md:text-2xl font-bold">{i}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-gray-900 mb-6 sm:mb-8 leading-tight max-w-5xl mx-auto">
            Communicate With Deaf And Hard Of Hearing People
            <span className="inline-block ml-2 sm:ml-4 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">🤟</span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-4xl mx-auto mb-8 sm:mb-10 md:mb-12 leading-relaxed px-4">
            Project to recognize sign language and promote greater awareness and sensitivity toward the Deaf and Hard of Hearing community, Mix
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4">
            <Link
              className="w-full sm:w-auto border-2 border-teal-600 text-teal-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl font-semibold text-base sm:text-lg hover:bg-teal-600 hover:text-white transition-all duration-300 text-center"
              href="/predict"
            >
              Try it now
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}