import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Styles from "./UserInfo.module.scss";
import { RiUser3Line as UserIcon } from "react-icons/ri";

const User = (props) => {
  const Auth = useContext(AuthContext);

  const { name, id, email, image, loggedIn } = Auth.user;
  if (loggedIn)
    return (
      <div className={Styles.UserInfo} style={props.style}>
        <div className={Styles.UserIcon} onClick={Auth.logout}>
          {image ? (
            <div
              className={Styles.UserImage}
              style={{ backgroundImage: `url(${image})` }}
            ></div>
          ) : (
            <UserIcon />
          )}
        </div>
      </div>
    );
  else
    return (
      <div className={Styles.UserInfo} style={props.style}>
        <Link to="/login" className={Styles.UserIcon}>
          <UserIcon />
        </Link>
      </div>
    );
};

export default User;
