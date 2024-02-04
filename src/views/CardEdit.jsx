import React from 'react';

function CardEdit({ card }) {
  return (
    <div className="mainContainer">
      <div className="toolbar">
        <button type="submit" className="saveCardBtn" id="saveCardBtn" form="cardEditForm">Сохранить</button>
      </div>
      <div className="cardInfoWrapper">
        <form id="cardEditForm" data-card-id={card.id} className="cardEditForm" action="">
          <label htmlFor="title">
            <p>Название</p>
            <input type="text" name="title" value={card.title} />
          </label>
          <label htmlFor="image">
            <p>Изображение (ссылка)</p>
            <input type="text" name="image" value={card.image} />
          </label>
          <label htmlFor="description">
            <p>Описание</p>
            <textarea type="text" name="description" value={card.description} />
          </label>
        </form>
      </div>
    </div>
  );
}

export default CardEdit;
