import React from 'react';
import Card from './components/Card';

function ShopCabinet({ title = 'no title passed', cards, user }) {
  return (
    <div className="mainPageContainer">
      <h2>{ title }</h2>
      <div id="cardWrapp" className="cardWrapp">
        <div className="cardWrapper addNew">Добавить</div>
        {cards.map((card) => (
          <Card context="cabinet" key={card.id} card={card} user={user} data-card-id={card.id} />
        ))}
      </div>
    </div>
  );
}

export default ShopCabinet;
