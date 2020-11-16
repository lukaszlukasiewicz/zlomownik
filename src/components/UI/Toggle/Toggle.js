import React from "react";
import Styles from "./Toggle.module.scss";

export default (props) => {
  return (
    <div
      className={Styles.Toggle}
      onClick={(e) => props.onChange(!props.state) || false}
    >
      <div
        className={`${Styles.Toggle__switch} ${
          props.state ? Styles.Toggle__on : Styles.Toggle__off
        }`}
      >
        <div />
      </div>
      {props.label}
    </div>
  );
};
