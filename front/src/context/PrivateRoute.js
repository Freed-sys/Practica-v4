import { useEffect, useState } from 'react'
import { getToken } from '../helpers/usuario';
import {  Route } from "react-router-dom";
import SignIn from '../scenes/login/SignIn';

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
                <SignIn setLoggedIn={false}/>
            )
          }
        />
      )

 
}

export default PrivateRoute;