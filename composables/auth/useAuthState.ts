import {jwtDecode}  from 'jwt-decode'

interface DecodedToken {
  exp: number; // JWT expiration timestamp (in seconds)
}

export const useAuthState = () => {
  const isLoggedIn = useState<boolean>('isLoggedIn', () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (!token) return false;

      const decoded = jwtDecode<DecodedToken>(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      return !isExpired;
    } catch {
      return false;
    }
  });

  watch(isLoggedIn, (newValue) => {
    try {
      localStorage.setItem('isLoggedIn', String(newValue));
    } catch {
      console.log("Couldn't save login status in localStorage");
    }
  });

  return isLoggedIn;
};