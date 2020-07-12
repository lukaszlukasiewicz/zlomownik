import React from 'react';
import Styles from './Card.module.scss'

const CardImage = (props) => {

  return (
    <div className={Styles.CardImage} style={{backgroundImage:`url(${props.imageUrl})`}}>
        <div className={Styles.CardImage__title}><span>{props.title}</span></div>
    </div>
  )
}

const Card = props => {
  return (
    <div className={Styles.Card}>
      {props.image && <CardImage title={props.title} imageUrl={props.image}/>}
      {props.children}
    </div>
  )
}

export default Card;