import React from 'react';

function Card({ card }) {
  return (
    <div className="cardWrapper" data-card-id={card.id}>
      <div className="imageContainer">
        <img className="cover" src={card.image} alt="placeholder" />
        <div className="cardToolbarBtns">
          <div className="cardToolbarBtn" data-type="edit"><img className="toolbarIcon" src="/assets/icons/edit.svg" alt="edit" /></div>
          <div className="cardToolbarBtn" data-type="view"><img className="toolbarIcon" src="/assets/icons/delete.svg" alt="edit" /></div>
        </div>
      </div>
      <div className="cardMetaWrapper">
        <span className="cardTitle">{card.title}</span>
        <span className="cardDescription">{card.description}</span>
      </div>

    </div>
  );
}

export default Card;
