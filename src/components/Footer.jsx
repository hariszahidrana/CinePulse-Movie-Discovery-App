import React from 'react'

const Footer = () => {
  return (
<footer className="bg-neutral-900 text-gray-400 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Brand & About */}
          <div className="space-y-4">
            <h1 className="text-2xl font-black tracking-wider text-red-600">
              CINE<span className="text-white">PULSE</span>
            </h1>
            <p className="text-sm ">
              Your ultimate destination for discovering movies and TV shows. Track your favorites, explore trending titles, and keep your cinema pulse active.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">Home</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Trending Movies</a></li>
              <li><a href="#" className="hover:text-red-500 transition">TV Shows</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Top Rated</a></li>
            </ul>
          </div>

          {/* Column 3: Legal / Support */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Support</h3>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-red-500 transition">FAQ</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Terms of Service</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-red-500 transition">Contact Us</a></li>
            </ul>
          </div>

          {/* Column 4: Newsletter Subscription */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-sm mb-4">Subscribe to get notified about new movie releases.</p>
            <form onSubmit={(e) => e.preventDefault()} className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                placeholder="Enter email"
                className="bg-neutral-800 text-sm px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 text-white w-full"
              />
              <button type="submit" className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded-md transition">
                Join
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row justify-between items-center text-xs">
          <p>&copy; {new Date().getFullYear()} CINEPULSE. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            {/* Simple Text Placeholders for Social Icons */}
            <a href="#" className="hover:text-white transition">Twitter</a>
            <a href="#" className="hover:text-white transition">Instagram</a>
            <a href="#" className="hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
