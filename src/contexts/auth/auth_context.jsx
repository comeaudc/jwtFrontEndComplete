import { createContext, useContext, useMemo } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [cookies, setCookie, removeCookie] = useCookies();

  const login = async (formData) => {
      let res = await axios({
        method: 'POST',
        url: 'https://jwtbackendcomplete-1.onrender.com/api/auth',
        data: formData,
      });

      setCookie('token', res.data.token);
  };

  const signUp = async (formData) => {
    try {
      let res = await axios({
        method: 'POST',
        url: 'https://jwtbackendcomplete-1.onrender.com/api/users',
        data: formData,
      });

      setCookie('token', res.data.token);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    ['token'].forEach((cookie) => {
      removeCookie(cookie);
    });
  };

  const value = useMemo(
    () => ({
      cookies,
      login,
      logout,
      signUp,
    }),
    [cookies]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Cheeky function to minimize imports on others components
export function useAuth() {
  return useContext(AuthContext);
}
