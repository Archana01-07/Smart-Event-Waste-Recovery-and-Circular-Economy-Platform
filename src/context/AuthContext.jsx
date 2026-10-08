import { createContext, useContext, useState, useCallback } from 'react';
import { mockUsers } from '@/data/users';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('ecoloop-user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const persist = useCallback((u) => {
    if (u) localStorage.setItem('ecoloop-user', JSON.stringify(u));
    else localStorage.removeItem('ecoloop-user');
    setUser(u);
  }, []);

  const login = useCallback(async (email, password) => {
    await new Promise((r) => setTimeout(r, 600));
    const found = mockUsers.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Invalid email or password');
    const { password: _, ...safe } = found;
    persist(safe);
    return safe;
  }, [persist]);

  const signup = useCallback(async (data) => {
    await new Promise((r) => setTimeout(r, 800));
    const newUser = {
      id: `user-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      organization: data.organization || null,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${data.email}`,
      verified: data.role === 'admin',
    };
    persist(newUser);
    return newUser;
  }, [persist]);

  const logout = useCallback(() => persist(null), [persist]);

  const updateUser = useCallback(
    (patch) => {
      if (!user) return;
      persist({ ...user, ...patch });
    },
    [user, persist]
  );

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        role: user?.role,
        login,
        signup,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
}
