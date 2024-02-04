import React from 'react';

function Card({ card }) {
  console.log(card.published)
  return (
    <div className="mainContainer">
      <div className="toolbar">
        <button type="button" className="editBtn">Редактировать</button>
      </div>
      <div className="cardInfoWrapper">
        <div className="imgWrapper">
          <img className="img" src={card.image} alt={card.title} />
          <button className="publishBtn" type="button">{ card.published ? 'Снять с публикации' : 'Опубликовать'}</button>
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
