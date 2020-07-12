import React, {useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext'
import { Link} from "react-router-dom";
import Styles from "./UserInfo.module.scss"

function User() {

  const Auth = useContext(AuthContext);

  const {name,id,email,loggedIn} = Auth.user
  if(loggedIn) return (
    <div className={Styles.UserInfo}>
      user: {name} <br/>
      email: {email} <br/>
      id: {id} <br/>
      <button onClick={Auth.logout}>Logout</button>
    </div>
  )
  else return(
    <div className={Styles.UserInfo}>
      <Link to="/login">Zaloguj</Link>
    </div>
  )
}

export default User;