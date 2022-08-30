
import { supabase } from './supabaseClient'
import { useContext, useState, useEffect, createContext} from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // create state values for user data and loading
    const [user, setUser] = useState();
    const [loading, setLoading] = useState(true);

  
    useEffect(() => {
      // get session data if there is an active session
      const session = supabase.auth.session();
  
      setUser(session?.user ?? null);
      setLoading(false);
  
      // listen for changes to auth
      const { data: listener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          setUser(session?.user ?? null);
          setLoading(false);
        }
      );
  
      // cleanup the useEffect hook
      return () => {
        listener?.unsubscribe();
      };
    }, []);

    // create signUp, signIn, signOut functions
    const value = {
      signOut: () => supabase.auth.signOut(),
      user,
    };
  
    // use a provider to pass down the value
    return (
      <AuthContext.Provider value={value}>
        {!loading && children}
      </AuthContext.Provider>
    );
  };

export function useAuth() {
    return useContext(AuthContext);
}
