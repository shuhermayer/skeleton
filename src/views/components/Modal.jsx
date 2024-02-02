import React from 'react';

function Modal() {
  return (
    <div className="modal" id="modal" hidden>
      <div className="modalOverlay" id="modalOverlay">
        <div className="modalContainer">
          <h1 id="modalTitle">Название модала</h1>
          <div className="modalForm">
            <form id="form" action="/api/login" method="post" className="modalForm">
              <label className="label" htmlFor="login">Логин</label>
              <input className="input" type="text" name="login" />
              <label htmlFor="password">Пароль</label>
              <input className="input" type="text" name="password" />
              <button type="submit" name="btm">Войти</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
