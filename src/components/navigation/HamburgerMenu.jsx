import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useFetchCategories from "../../hooks/useFetchCategories";
import HamburgerButton from "../buttons/HamburgerButton";

function HamburgerMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const panelRef = useRef(null);
  const iconRef = useRef(null);
  const navigate = useNavigate();
  const { categories, loading, error } = useFetchCategories();

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
    if (isOpen) setShowCategories(false);
  };

  const toggleCategories = () => {
    setShowCategories((prev) => !prev);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setIsOpen(false);
    setShowCategories(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      const clickedOutsidePanel = panelRef.current && !panelRef.current.contains(e.target);
      const clickedOutsideIcon = iconRef.current && !iconRef.current.contains(e.target);

      if (isOpen && clickedOutsidePanel && clickedOutsideIcon) {
        setIsOpen(false);
        setShowCategories(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <div className="relative ">
      <div className="flex items-center justify-center h-full">
        <HamburgerButton ref={iconRef} isOpen={isOpen} onClick={toggleMenu} />
      </div>
      <div
        ref={panelRef}
        className={`fixed top-0 left-0 w-[42vw] max-w-[220px] z-1000 transition-transform duration-300 ease-in-out
                    bg-secondary text-accent font-primary rounded-br-fluid-m
                    p-fluid-s pr-0 shadow-[2px_0_10px_rgba(0,0,0,0.3)] flex flex-col 
                    ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <button
          className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
          onClick={() => handleNavigate("/")}
        >
          Home
        </button>

        <div className="flex flex-col">
          <button
            onClick={toggleCategories}
            className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
          >
            Categories {showCategories ? "▲" : "▼"}
          </button>

        <div
          className={`transition-all duration-400 ease-in-out overflow-hidden ${
            showCategories ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {loading && (
            <div className="text-fluid-s italic pl-fluid-m">Loading...</div>
          )}
          {error && (
            <div className="text-fluid-s text-red-500 pl-fluid-m">Error: {error}</div>
          )}
          <ul className="list-none pl-fluid-xs mb-fluid-xs">
            {categories.map(({ categoryTitle, categoryDisplayName }) => (
              <li key={categoryTitle} className="w-fit h-auto leading-none">
                <button
                  onClick={() => handleNavigate(`/products?category=${categoryTitle}`)}
                  className="inline-block w-fit p-0 m-0 leading-none text-fluid-s text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
                >
                  {categoryDisplayName}
                </button>
              </li>
            ))}
          </ul>
        </div>

        </div>

        <a
          href="https://sikrdesign.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
        >
          SIKR Design
        </a>
        <button
          className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
          onClick={() => handleNavigate("/cart")}
        >
          Cart
        </button>
        <button
          className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
          onClick={() => handleNavigate("/about")}
        >
          About Us
        </button>
        <button
          className="text-fluid-m text-left my-fluid-xs w-fit cursor-pointer transition-all duration-200 ease-in-out hover:-translate-y-[2px] hover:text-blend"
          onClick={() => handleNavigate("/contact")}
        >
          Contact
        </button>

      </div>
    </div>
  );
}

export default HamburgerMenu;
