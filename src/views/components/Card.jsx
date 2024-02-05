import React from 'react';
import BuyButton from './BuyButton';

function Card({
  card, user, context,
}) {
  console.log('card', card?.Carts?.length > 0)
  console.log('user', user);
  console.log('context', context)
  const ownCard = user.id === card.userId;
  return (
    <div className="cardWrapper" data-card-id={card.id}>
      <div className="imageContainer">
        <img className="cover" src={card.image} alt="placeholder" />
        {ownCard
        && (
        <div className="cardToolbarBtns">
          <div className="cardToolbarBtn editWidget" data-type="edit"><img className="toolbarIcon" src="/assets/icons/edit.svg" alt="edit" /></div>
          <div className="cardToolbarBtn deleteWidget" data-type="view"><img className="toolbarIcon" src="/assets/icons/delete.svg" alt="edit" /></div>
        </div>
        )}
      </div>
      <div className="cardMetaWrapper">
        <span className="cardTitle">{card.title}</span>
        <span className="cardDescription">{card.description}</span>
        {
          context === 'shop'
          && (card?.Carts?.length > 0)
            ? <BuyButton disabled title="В корзине" cardId={card.id} />
            : <BuyButton disabled={false} title="Купить" cardId={card.id} />
}
      </div>

    </div>
  );
}

export default Card;
