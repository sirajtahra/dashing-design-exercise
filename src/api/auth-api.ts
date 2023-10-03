export interface User {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: "female" | "male" | "other";
  image: string;
  token: string;
}

export type SignInResponse = User;

export async function signInApi(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _username: string,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _password: string
): Promise<User> {
  return fetch("https://dummyjson.com/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      username: "kminchelle",
      password: "0lelplR",
      // expiresInMins: 60, // optional
    }),
  }).then((res) => {
    if (!res.ok) {
      return res.text().then((text: string) => {
        throw new Error(text);
      });
    }
    return res.json();
  });
}

interface AuthProvider {
  isAuthenticated: boolean;
  username: string;
  signin(username: string, password: string): Promise<SignInResponse>;
  signout(): Promise<void>;
}

/**
 * This represents some generic auth provider API, like Firebase.
 */
export const fakeAuthProvider: AuthProvider = {
  isAuthenticated: false,
  username: "",
  async signin(username: string, password: string) {
    const user = await signInApi(username, password);
    fakeAuthProvider.isAuthenticated = true;
    fakeAuthProvider.username = user.username;

    return user;
  },
  async signout() {
    await new Promise((r) => setTimeout(r, 500)); // fake delay
    fakeAuthProvider.isAuthenticated = false;
    fakeAuthProvider.username = "";
  },
};
