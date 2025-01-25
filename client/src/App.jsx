import React from "react";
import { Outlet } from "react-router-dom";
import LoadingPage from './components/general/LandingPage';


const App = () => {
  
  return (
    <div className="min-h-screen w-screen dark:bg-gradient-to-b from-gray-900 to-gray-800 bg-white text-gray-100">
      <div
        className={`p-0 w-full min-h-[calc(100vh-env(safe-area-inset-top))]`}
      >
        <div
          style={{ paddingTop: "env(safe-area-inset-top)" }}
        >
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default App;
