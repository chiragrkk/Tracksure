import React from "react";
import { Link } from "react-router-dom";
import { ModeToggle } from "@components/common/mode-toggle";
import { useTheme } from "@components/common/ThemeProvider"

const Header: React.FC = () => {
  const { theme } = useTheme();

  const logoSrc =
    theme === "dark"
      ? "/src/assets/logo-nobg-white.png"
      : "/src/assets/logo-nobg-black.png";

  return (
    <header className="border-b">
      <div className="flex items-center justify-between px-6 py-3 h-[80px]">
        <div className="flex items-center">
          <Link to={""}>
             <img src={logoSrc} alt="Logo" className="h-[100px]" />
          </Link>
          <span className="text-xl font-bold">TrackSure</span>
        </div>
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
