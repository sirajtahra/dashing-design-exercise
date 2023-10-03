import React from "react";
import { AuthContext } from "../providers/auth-provider";

export function useAuth() {
  return React.useContext(AuthContext);
}
