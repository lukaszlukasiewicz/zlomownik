import React, { useContext } from "react";
import { AuthContext } from "contexts/AuthContext";
import { Link } from "react-router-dom";
import Styles from "./UserInfo.module.scss";
import { RiUser4Line as UserIcon } from "react-icons/ri";
import { MdExitToApp as Exit } from "react-icons/md";
import PopMenu from "components/UI/PopMenu/PopMenu";
import Menu, { MenuItem } from "components/UI/Menu/Menu";

const LoggedIn = (props) => {
  //const { name, id, email, image } = props.user;
  const { image } = props.user;
  console.log("turutu", image);
  return (
    <div
      className={Styles.UserInfo}
      style={props.style}
      onClick={props.onClick}
    >
      <div className={Styles.UserIcon}>
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
};

const User = (props) => {
  const Auth = useContext(AuthContext);

  const { loggedIn } = Auth.user;
  if (loggedIn) {
    return (
      <div className="dupa" style={props.style}>
        <PopMenu component={<LoggedIn user={Auth.user} />}>
          <Menu>
            <MenuItem>Opcje</MenuItem>
            <MenuItem>Ulubione miejsca</MenuItem>
            <MenuItem>Moje listy</MenuItem>
            <MenuItem style={{ fontWeight: "bold" }} onClick={Auth.logout}>
              <Exit color="#f00" /> Wyloguj
            </MenuItem>
          </Menu>
        </PopMenu>
      </div>
    );
  } else
    return (
      <div className={Styles.UserInfo} style={props.style}>
        <Link to="/login" className={Styles.UserIcon}>
          <UserIcon />
        </Link>
      </div>
    );
};

export default User;
