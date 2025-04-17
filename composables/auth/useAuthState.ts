export const useAuthState = () => {
  
  // using useState to create a global state and saving the data in IsloggedIn 
  const isLoggedIn = useState<boolean>('isLoggedIn', () => {
    try {
      // 
      return localStorage.getItem('isLoggedIn') === 'true';

    } catch {
      return false;

    }
  });

  watch(isLoggedIn, (newValue) => {
    try {
      localStorage.setItem('isLoggedIn', String(newValue))
    } catch {
      console.log("Couldn't save login status in localStorage")
    }
  });
    
 
  return isLoggedIn;
}