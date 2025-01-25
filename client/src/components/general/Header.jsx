import { Link, NavLink } from "react-router-dom";
import appName from "../../constants/appName";
import SearchBox from "./SearchBox";
import ToggleTheme from "./ToggleTheme";

const Header = () => {
  return (
    <>
      <nav className="lg:h-[4.5rem] z-50 fixed top-0 w-full dark:bg-gradient-to-b from-gray-900 to-gray-800 h-16 lg:py-5 pt-4 pb-[1rem] flex justify-between items-center space-x-2 px-5 lg:px-20 border-b-[1px] text-gray-100 bg-white select-none">
        <div className="flex items-center space-x-6 font-semibold">
          <Link
            to="/"
            className="text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors cursor-pointer text-2xl font-helvetica font-semibold flex space-x-2 justify-center items-center"
          >
            <span className="sm:inline">{appName}</span>
            <img
              src="https://static.vecteezy.com/system/resources/thumbnails/017/744/376/small_2x/stock-exchange-market-with-chart-png.png"
              alt="app-logo"
              className="h-[35px] active:animate-spin"
            />
          </Link>
        </div>
        <div className="text-zinc-600 dark:text-zinc-400 md:flex justify-center items-center space-x-7 font-semibold">
          <SearchBox />
          <ToggleTheme/>
        </div>
        
      </nav>
      <div className="h-16 lg:h-[4.5rem]"></div>
    </>
  );
};

export default Header;
