import React from "react";
import { SignInResponse, fakeAuthProvider } from "../api/auth-api";
import { useLocalStorage } from "../hooks/useLocalStorage";

export type Roles = "Viewer" | "Editor";

interface AuthContextType {
  user: SignInResponse;
  signin: (username: string, password: string) => void;
  signout: () => void;
  roles: Roles[];
  switchRole: (role: Roles) => void;
}

export const AuthContext = React.createContext<AuthContextType>(null!);

function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useLocalStorage("user", null);
  const [roles, setRoles] = useLocalStorage("roles", ["Viewer"]);

  const signin = async (username: string, password: string) => {
    const user = await fakeAuthProvider.signin(username, password);
    setUser(user);
  };

  const signout = async () => {
    await fakeAuthProvider.signout();
    setUser(null);
  };

  const switchRole = (role: Roles) => {
    setRoles([role]);
  };

  const value = { user, signin, signout, roles, switchRole };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
