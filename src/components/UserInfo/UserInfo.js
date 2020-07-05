import React, {useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext'
import { Link} from "react-router-dom";


function User() {

  const Auth = useContext(AuthContext);

  const {name,id,email,loggedIn} = Auth.user
  if(loggedIn) return (
    <div>
      user: {name} <br/>
      email: {email} <br/>
      id: {id} <br/>
      <button onClick={Auth.logout}>Logout</button>
    </div>
  )
  else return(
    <Link to="/login">Zaloguj</Link>
  )
}

export default User;