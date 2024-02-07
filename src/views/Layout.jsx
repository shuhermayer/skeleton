const React = require('react');
const Header = require('./components/Header');

module.exports = function Layout({
  user, children, title, titleCode,
}) {
  let login;
  if (user) {
    login = user.login;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{`Some APP — ${title || ''}`}</title>
        <link rel="stylesheet" href="/css/deck.css" />
        <link rel="stylesheet" href="/css/layout.css" />
        <link rel="stylesheet" href="/css/header.css" />
        <link rel="stylesheet" href="/css/card.css" />
        <link rel="stylesheet" href="/css/card-info.css" />
        <script defer src="/js/client.js" />
        <script defer src="/js/main.js" />
        <script defer src="/js/header.js" />
        <script defer src="/js/cart.js" />
      </head>
      <body className="body">
        <Header login={login} titleCode={titleCode} />
        <h1 style={{ marginLeft: '40px' }}>{title}</h1>
        {children}
      </body>
    </html>
  );
};
