import { useEffect, useState } from 'react'
import { getToken } from '../helpers/usuario';
import {  Route, Navigate } from "react-router-dom";

function PrivateRoute({Component, ...rest}) {
  
    const [loggedIn, setLoggedIn] = useState(false);


 useEffect(() => {

    const token = getToken();
    if (token) {
      setLoggedIn(true);
    }
 },[])

//if (isLoading) return <h1>Loading...</h1>;

 return (
        <Route {...rest}
          render={(props) =>
            loggedIn ? (
              <Component {...props} />
            ) : (
                <Navigate to="/login" replace />
            )
          }
        />
      )

 
}

export default PrivateRoute;