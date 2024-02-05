const React = require('react');

function Cart({ cart }) {
  return (
    <div className="mainPageContainer">
      <div id="cartListWrapper" className="cartListWrapper">
        {cart.map((cartTtem) => (
          <div key={cartTtem.id} data-cart-item-id={cartTtem.id} className="cartItemContainer">
            <div className="cartItemTitle">{cartTtem.Card.title}</div>
            <div className="counterContaier">
              <button id="minusCartItemBtn" className="minusCartItemBtn" type="button">-</button>
              <div className="countValue">{cartTtem.count}</div>
              <button id="plusCartItemBtn" className="plusCartItemBtn" type="button">+</button>
            </div>
            <button id="deleteCartItemBtn" className="deleteCartItemBtn" type="button">Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
}

module.exports = Cart;
