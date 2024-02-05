import React from 'react';

function BuyButton({ cardId, title, disabled = false }) {
  return (
    <button className="buyBtn" disabled={disabled} type="button" data-card-id={cardId}>{title}</button>
  )
}

export default BuyButton;
