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

  const positionMenu = () => {
    if (!containerRef.current) return false;
    const menu = containerRef.current.querySelector(`.${Styles.PopMenu}`);
    if (!menu) return false;
    const menuContainerBoundingRect = containerRef.current.getBoundingClientRect();
    const menuBoundingRect = menu.getBoundingClientRect();
    menu.style.top = `${
      menuContainerBoundingRect.top + menuContainerBoundingRect.height + 10
    }px`;
    menu.style.left = `${
      menuContainerBoundingRect.left + menuContainerBoundingRect.width / 2
    }px`;
  };

  useEffect(() => {
    document.addEventListener("click", hideMenu);
    return () => document.removeEventListener("click", hideMenu);
  }, []);

  useEffect(() => {
    console.log("add menu listener");
    window.addEventListener("scroll", positionMenu);
    window.addEventListener("resize", positionMenu);
    return () => {
      window.removeEventListener("scroll", positionMenu);
      window.removeEventListener("resize", positionMenu);
    };
  }, []);

  if (menu)
    requestAnimationFrame(() => {
      positionMenu();
    });

  if (!props.component) return false;
  return (
    <div ref={containerRef} className={Styles.PopMenu__container}>
      <div>{React.cloneElement(props.component, { onClick: toggleMenu })} </div>
      {menu ? <div className={Styles.PopMenu}>{props.children}</div> : false}
    </div>
  );
};
