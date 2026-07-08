import { useState } from "react";
import { NavLink, useNavigate } from 'react-router-dom';
import { useMovieContext } from '../contexts/MovieContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar({ onSearch }) {
  const { favorites } = useMovieContext();
  const { user, login, logout } = useAuth();
  const [authMode, setAuthMode] = useState("signin");
  const [showAuthForm, setShowAuthForm] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [searchQuery, setSearchQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    if (onSearch) onSearch(searchQuery);
    navigate('/');
  };

  const handleAuthSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    setMessage(result.message);
    if (result.success) {
      setEmail("");
      setPassword("");
      setShowAuthForm(false);
    }
  };

  const openAuthForm = (mode) => {
    setAuthMode(mode);
    setMessage("");
    setShowAuthForm(true);
  };

  return (
    <nav className="sticky top-0 z-50 bg-neutral-900 text-white shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <NavLink to="/" className="text-2xl font-black tracking-wider text-red-600">
              CINE<span className="text-white">PULSE</span>
            </NavLink>
          </div>

          <div className="hidden space-x-6 text-sm font-medium text-gray-300 md:flex">
            <NavLink to="/" className={({ isActive }) => `transition hover:text-red-500 ${isActive ? 'text-white' : ''}`}>
              Home
            </NavLink>
            <NavLink to="/favorites" className={({ isActive }) => `transition hover:text-red-500 ${isActive ? 'text-white' : ''}`}>
              Favorites
              <span className="ml-2 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">{favorites.length}</span>
            </NavLink>
          </div>

          <div className="hidden items-center space-x-4 md:flex">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 rounded-full bg-neutral-800 px-4 py-2 pr-10 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <button type="submit" className="absolute right-3 top-2.5 text-gray-400 hover:text-white">
                🔍
              </button>
            </form>
            <div className="flex items-center gap-3">
              {user ? (
                <>
                  <span className="text-sm text-gray-300">Hi, {user.name}</span>
                  <button onClick={logout} className="rounded-full bg-neutral-800 px-3 py-2 text-sm text-white hover:bg-red-600">
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <button onClick={() => openAuthForm("signin")} className="rounded-full bg-neutral-800 px-3 py-2 text-sm text-white hover:bg-red-600">
                    Sign In
                  </button>
                  <button onClick={() => openAuthForm("signup")} className="rounded-full bg-red-600 px-3 py-2 text-sm text-white hover:bg-red-500">
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-400 hover:text-white focus:outline-none"
            >
              <span className="text-2xl">{isOpen ? '✕' : '☰'}</span>
            </button>
          </div>
        </div>
      </div>

      {!user && showAuthForm && (
        <div className="border-t border-neutral-800 bg-neutral-900 px-4 py-4 md:hidden">
          <form onSubmit={handleAuthSubmit} className="space-y-2">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
            <button type="submit" className="w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
              {authMode === "signin" ? "Sign In" : "Sign Up"}
            </button>
            {message && <p className="text-sm text-gray-400">{message}</p>}
          </form>
        </div>
      )}

      {!user && showAuthForm && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-white">{authMode === "signin" ? "Sign In" : "Sign Up"}</h3>
              <button onClick={() => setShowAuthForm(false)} className="text-sm text-gray-400 hover:text-white">Close</button>
            </div>
            <form onSubmit={handleAuthSubmit} className="space-y-3">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-red-600"
              />
              <div className="flex items-center gap-2">
                <button type="submit" className="rounded-full bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-500">
                  {authMode === "signin" ? "Sign In" : "Sign Up"}
                </button>
                <button type="button" onClick={() => setAuthMode(authMode === "signin" ? "signup" : "signin")} className="text-sm text-gray-400 hover:text-white">
                  {authMode === "signin" ? "Create account" : "Use existing account"}
                </button>
              </div>
              {message && <p className="text-sm text-gray-400">{message}</p>}
            </form>
          </div>
        </div>
      )}

      {isOpen && (
        <div className="space-y-3 border-t border-neutral-800 bg-neutral-900 px-4 pb-4 pt-2 shadow-inner md:hidden">
          <NavLink to="/" className="block text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/favorites" className="block text-gray-300 hover:text-white" onClick={() => setIsOpen(false)}>
            Favorites
          </NavLink>
          <form onSubmit={handleSubmit} className="relative pt-2">
            <input
              type="text"
              placeholder="Search movies..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-md bg-neutral-800 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-red-600"
            />
          </form>
        </div>
      )}
    </nav>
  );
}