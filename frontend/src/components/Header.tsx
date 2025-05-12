import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <Link to="/" className="block">
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-colors duration-300">
            🗺️ Countries Explorer
          </h1>
          <p className="text-gray-600 text-center mt-2 text-sm">
            Discover the world, one country at a time
          </p>
        </Link>
      </div>
    </header>
  );
}
