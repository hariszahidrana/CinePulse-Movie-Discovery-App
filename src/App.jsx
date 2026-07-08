import { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import { MovieProvider } from "./contexts/MovieContext";
import { useAuth } from "./contexts/AuthContext";
import "./App.css";

function App() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query.trim());
  };

  return (
    <MovieProvider >
      <Navbar  onSearch={handleSearch} />

      <main className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 ">
        <Routes>
          <Route path="/" element={<Home searchQuery={searchQuery} />} />
          <Route path="/favorites" element={user ? <Favorites /> : <Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      <Footer />
    </MovieProvider>
  );
}

export default App;
