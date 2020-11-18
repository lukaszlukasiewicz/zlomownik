import React from "react";
import Styles from "./Menu.module.scss";

export const MenuItem = (props) => {
  const { children, className, ...buttonProps } = props;
  return (
    <button className={`${Styles.Menu__item} ${className}`} {...buttonProps}>
      {children}
    </button>
  );
};

export default (props) => {
  const { children, className, ...divProps } = props;
  return (
    <div className={`${Styles.Menu} ${className}`} {...divProps}>
      {children}
    </div>
  );
};
