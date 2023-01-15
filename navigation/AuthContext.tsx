import * as React from "react";

const { createContext } = React;

interface AuthContextType {
  token: string | null;
  setAuthToken: (token: string) => void;
}

export const AuthContext = createContext<AuthContextType>({
  token: "",
  setAuthToken(token) {},
});
