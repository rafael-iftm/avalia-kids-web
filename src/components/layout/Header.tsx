import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { LogOut, User, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // Fecha o dropdown se clicar fora dele
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-white shadow px-6 py-4 grid grid-flow-col justify-items-end relative">
      <div className="mr-5 flex items-center relative" ref={dropdownRef}>
        <User size={40} className="self-center" />
        <div className="ml-2">
          <h1 className="text-xl font-semibold text-gray-800">
            Olá{user && user.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h1>
          <p className="text-gray-600">Como vai?</p>
        </div>
        <button
          onClick={toggleDropdown}
          className="ml-2 focus:outline-none"
          aria-label="Toggle dropdown"
        >
          <ChevronDown className="self-center cursor-pointer" />
        </button>

        {isDropdownOpen && (
          <div className="absolute top-full right-0 mt-2 w-32 bg-white border-none
 rounded shadow-md z-10">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
            >
              <LogOut size={16} className="inline mr-2" />
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
