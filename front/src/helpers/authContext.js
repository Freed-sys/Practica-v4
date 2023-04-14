import React, { createContext, useState } from "react";
import { Routes, Route, Navigate, Redirect } from "react-router-dom";


export const AuthContext = createContext({
  loggedIn: false,
  setLoggedIn: () => {},
});

// export function AuthProvider({ children }) {
//   const [loggedIn, setLoggedIn] = useState(false);

//   return (
//     <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }


export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}





export function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  )
}
