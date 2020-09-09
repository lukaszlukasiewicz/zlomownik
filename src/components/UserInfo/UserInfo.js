import React, {useContext} from 'react';
import {AuthContext} from 'contexts/AuthContext'
import { Link} from "react-router-dom";
import Styles from "./UserInfo.module.scss"
import {FaUser} from 'react-icons/fa';

function User() {

  const Auth = useContext(AuthContext);

  const {name,id,email,image,loggedIn} = Auth.user
  if(loggedIn) return (
    <div className={Styles.UserInfo}>
      <div className={Styles.UserIcon} onClick={Auth.logout}>
        {image?(<div className={Styles.UserImage} style={{backgroundImage:`url(${image})`}}></div>):<FaUser/>}
      </div>
    </div>
  )
  else return(
    <div className={Styles.UserInfo}>
      <Link to="/login" className={Styles.UserIcon}>
        <FaUser/>
      </Link>
    </div>
  )
}

export default User;