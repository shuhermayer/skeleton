const React = require('react');
const { default: Modal } = require('./Modal');

function Header({ login }) {
  return (
    <header className="headerContainer">
      <div>
        <h1>SKELETON</h1>
      </div>
      <div className="menu">
        <div className="navElement" id="home">Главная</div>
        <div className="navElement" id="shop">Каталог</div>
        {login
          ? (
            <>
              <div className="navElement" id="storeCabinet">Кабинет магазина</div>
              <div>{login}</div>
              <div className="navElement" id="signout">Выйти</div>
              <div className="cartIconContainer" id="cart"><a href="/cart"><img src="/assets/icons/cart.svg" alt="cart" /></a></div>
            </>
          )
          : (
            <>
              <div className="navElement" id="login">Войти</div>
              <div className="navElement" id="signin">Зарегистрироваться</div>
            </>
          )}

      </div>
      <div>
        <Modal />
      </div>
    </header>
  );
}
module.exports = Header;
