import React from 'react';
import Styles from './Card.module.scss'

const Card = props => {
  return (
    <div className={Styles.Card}>
      {props.children}
    </div>
  )
}

export default Card;