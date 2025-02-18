import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { supabase } from "../config/supabaseClient";

type Session = any;

type AuthContextType = {
  session: Session | undefined;
  login: (email: string, password: string) => Promise<any>;
  logout: () => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<any>;
  isLoading: boolean;
};

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  session: undefined,
  login: async () => {},
  logout: async () => {},
  signup: async () => {},
  isLoading: false,
});

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password: password,
      });

      if (error) {
        console.error("An error occurred: ", error);
        setIsLoading(false);
        return { success: false, error };
      }
      
      return { success: true, error };

    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("An error occurred: ", error);
        setIsLoading(false);
      }

      setSession(null);
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email: email.toLowerCase(),
        password: password,
        options: {
          data: {
            display_name: name,
          },
        },
      });

      if (error) {
        console.error("there was an error trying to signup: ", error);
        setIsLoading(false);
        return { success: false, error };
      }

      if (data.user) {
        const { error: insertError } = await supabase.from("users").insert([
          {
            user_id: data.user.id,
            name: name,
            email: email.toLowerCase(),
          },
        ]);

        if (insertError) {
          console.error("Error inserting user data", insertError);
          return { success: false, error: insertError };
        }
      }

      return { success: true, data };
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setIsLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        login,
        logout,
        signup,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
