import React from 'react';
import Styles from './Button.module.scss';

const Button = (props = {}) => {
  return (
    <button className={Styles.Button} onClick={props.onClick}>{props.children}</button>
  )
}

export default Button