import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const userDetailsString = localStorage.getItem('user');
    return userDetailsString ? JSON.parse(userDetailsString) : null;
  });

  useEffect(() => {
    const userDetailsString = localStorage.getItem('user');
    if (userDetailsString) {
      setUser(JSON.parse(userDetailsString));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
