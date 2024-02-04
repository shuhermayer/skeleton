import React from 'react';
import Card from './components/Card';

function ShopCabinet({ title = 'no title passed', cards }) {
  return (
    <div className="mainPageContainer">
      <h2>{ title }</h2>
      <div id="cardWrapp" className="cardWrapp">
        {cards.map((card) => (
          <Card key={card.id} card={card} data-card-id={card.id} />
        ))}
      </div>
    </div>
  );
}

export default ShopCabinet;
