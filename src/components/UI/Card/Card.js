import React from "react";
import Styles from "./Card.module.scss";

const CardImage = (props) => {
  return (
    <div
      className={`${Styles.CardImage} ${props.className}`}
      style={{ backgroundImage: `url(${props.imageUrl})`, ...props.style }}
    >
      <div className={Styles.CardImage__title}>
        <h2>{props.title}</h2>
      </div>
    </div>
  );
};

const Card = (props) => {
  return (
    <div className={`${Styles.Card} ${props.className}`}>
      {props.image && <CardImage title={props.title} imageUrl={props.image} />}
      {props.children}
    </div>
  );
};

export default Card;
