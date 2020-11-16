import React, { useState, useEffect, useRef } from "react";
import Styles from "./PopMenu.module.scss";

export default (props) => {
  const [menu, setMenu] = useState(false);
  const containerRef = useRef();

  const toggleMenu = () => {
    console.log("click");
    setMenu(!menu);
  };
  const hideMenu = (event) => {
    console.log("hide");
    const container = containerRef.current;
    if (!container.contains(event.target)) {
      setMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", hideMenu);
    return () => document.removeEventListener("click", hideMenu);
  });
  if (!props.component) return false;
  return (
    <div ref={containerRef} className={Styles.PopMenu__container}>
      <div>{React.cloneElement(props.component, { onClick: toggleMenu })} </div>
      {menu ? <div className={Styles.PopMenu}>{props.children}</div> : false}
    </div>
  );
};
