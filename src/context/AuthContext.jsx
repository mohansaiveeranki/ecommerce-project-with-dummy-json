import { useCallback, useEffect, useMemo, useState } from "react";
import { AuthContext } from "./authContext";

const USERS_KEY = "marketnest_users";
const CURRENT_USER_KEY = "marketnest_current_user";

const readStoredValue = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
};

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => readStoredValue(USERS_KEY, []));
  const [currentUser, setCurrentUser] = useState(() =>
    readStoredValue(CURRENT_USER_KEY, null),
  );

  useEffect(() => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(CURRENT_USER_KEY);
    }
  }, [currentUser]);

  const register = useCallback(({ name, email, password }) => {
    const normalizedEmail = email.trim().toLowerCase();
    let createdUser;

    setUsers((storedUsers) => {
      const existingUser = storedUsers.find(
        (user) => user.email === normalizedEmail,
      );

      if (existingUser) {
        throw new Error("An account already exists for this email.");
      }

      const user = {
        id: crypto.randomUUID(),
        name: name.trim(),
        email: normalizedEmail,
        password,
      };

      createdUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      return [...storedUsers, user];
    });

    setCurrentUser(createdUser);
    return createdUser;
  }, []);

  const login = useCallback(
    ({ email, password }) => {
      const normalizedEmail = email.trim().toLowerCase();
      const user = users.find(
        (storedUser) =>
          storedUser.email === normalizedEmail &&
          storedUser.password === password,
      );

      if (!user) {
        throw new Error("Email or password is incorrect.");
      }

      const publicUser = {
        id: user.id,
        name: user.name,
        email: user.email,
      };

      setCurrentUser(publicUser);
      return publicUser;
    },
    [users],
  );

  const logout = useCallback(() => {
    setCurrentUser(null);
  }, []);

  const value = useMemo(
    () => ({
      currentUser,
      isAuthenticated: Boolean(currentUser),
      login,
      logout,
      register,
    }),
    [currentUser, login, logout, register],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
