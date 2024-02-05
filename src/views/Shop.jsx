import React from 'react';
import Card from './components/Card';

function Shop({ cards, user }) {
  return (
    <div className="mainPageContainer">
      <div id="cardWrapp" className="cardWrapp">
        {user && cards.map((card) => (
          <Card context="shop" key={card.id} user={user} card={card} data-card-id={card.id} />
        ))}
      </div>
    </div>
  );
}

export default Shop;
