import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from '@/hooks/useStorageState';
import type { SignInReturnType } from '@/redux/gql/signInSlice';
import { signIn, clearToken } from '@/redux/gql/signInSlice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';

const AuthContext = createContext<{
  register: (username: string, email: string, password: string) => void;
  loginIn: (username: string, email: string, password: string) => void;
  signIn: (token: string) => void; // TODO: remove later
  signOut: () => void;
  session?: string | null;
  status: string | null;
  error: string | undefined;
  isLoading: boolean;
}>({
  register: (username: string, email: string, password: string) => null,
  loginIn: (username: string, email: string, password: string) => null,
  signIn: (token: string) => null,
  signOut: () => null,
  status: '',
  error: undefined,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  // const dispatch = useAppDispatch();
  const { token, status, error } = useAppSelector((state) => state.signIn);
  const [[isLoading, session], setSession] = useStorageState('@token');

  return (
    <AuthContext.Provider
      value={{
        register: (username: string, email: string, password: string) => {
          // Perform sign-up logic here
          // dispatch(signIn({ userInfo: { name: username, email, password } }));
          if (token?.signIn) {
            setSession(token?.signIn);
          }
        },
        loginIn: (username: string, email: string, password: string) => {
          // Perform login logic here
          if (token?.signIn) {
            setSession(token?.signIn);
          }
        },
        signIn: (token: string) => {
          // Perform sign-in logic here
          setSession(token);
        },
        signOut: () => {
          setSession(null);
        },
        status,
        error,
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
