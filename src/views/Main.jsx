const React = require('react');
const { default: Card } = require('./components/Card');

function Main({ title = 'no title passed', cards }) {
  return (
    <div className="mainPageContainer">
      <h2>{ title }</h2>
      <div id="cardWrapp" className="cardWrapp">
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}

module.exports = Main;
