import React, { useState } from "react";
import { useAuth } from "../../../../contexts/AuthContext";

const AuthButton = () => {
  const { user, isAuthenticated, login, logout, loading } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  if (loading) {
    return null;
  }

  const handleClick = (event) => {
    if (isAuthenticated) {
      setIsMenuOpen(!isMenuOpen);
    } else {
      login();
    }
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  if (loading) {
    return null;
  }

  return (
    <>
      {isAuthenticated ? (
        <div className="relative">
          <button
            onClick={handleClick}
            className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-medium cursor-pointer"
          >
            {user.name}
          </button>

          {isMenuOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsMenuOpen(false)}
              />

              <div
                className="absolute top-full left-0 w-full mt-2 bg-white/95 backdrop-blur-xl border border-white/30 rounded-2xl shadow-2xl overflow-hidden z-50"
                style={{
                  boxShadow:
                    "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
              >
                <button
                  onClick={handleLogout}
                  className="w-full px-6 py-3 text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 font-medium text-sm flex items-center justify-center min-h-[44px] cursor-pointer"
                >
                  Logout
                </button>
              </div>
            </>
          )}
        </div>
      ) : (
        <button
          onClick={login}
          className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 text-white rounded-xl hover:bg-white/20 hover:border-white/30 transition-all duration-200 font-medium cursor-pointer"
        >
          Sign in with Google
        </button>
      )}
    </>
  );
};
export default AuthButton;
