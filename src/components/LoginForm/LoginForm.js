import React, {useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext'
import {Redirect} from 'react-router-dom'

const LoginForm = () => {

  const Auth = useContext(AuthContext);
  const {login, user: {loggedIn}} = Auth;
  console.log("render");
  if(loggedIn) return <Redirect to={{pathname:'/'}}/>
  return(
    <div>
      <h1>Login form</h1>
      <button onClick={login}>Zaloguj</button>
    </div>

  )
}

export default LoginForm;