import React from 'react';

function Card({ card }) {
  return (
    <div className="mainContainer">
      <div className="toolbar">
        <button type="button" className="editBtn">Редактировать</button>
      </div>
      <div className="cardInfoWrapper">
        <div className="imgWrapper">
          <img className="img" src={card.image} alt={card.title} />
        </div>
        <div className="metaWrapper">
          <h1>{card.title}</h1>
          <p>{card.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
