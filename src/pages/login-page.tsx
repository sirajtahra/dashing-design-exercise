import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

import styles from "../styles/login.module.scss";

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

const LoginPage = () => {
  const { signin } = useAuth();
  const [errors, setErrors] = useState<string[]>([]);
  const [applyNudge, setApplyNudge] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;

    const validationErrors: string[] = [];

    if (!passwordRegex.test(password)) {
      setApplyNudge(true);
      setTimeout(() => setApplyNudge(false), 820); // Reset after animation duration
      validationErrors.push(
        "Password must be at least 8 characters long, with 1 uppercase letter, 1 lowercase letter, and 1 special character."
      );
    }

    setErrors(validationErrors);

    if (validationErrors.length === 0) {
      // Password is valid.
      signin(username, password);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Sign in</h1>
            <br />
            <div>
              <label htmlFor="username">Username</label>
              <div>
                <input id="username" name="username" type="text" required />
              </div>
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  className={applyNudge ? styles.nudgeEffect : ""}
                  required
                />
                {errors.length > 0 && (
                  <ul>
                    {errors.map((error, index) => (
                      <li key={index} className={styles.error}>
                        {error}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              <button type="submit">Sign in</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
