const React = require('react');
const Header = require('./components/Header');

module.exports = function Layout({ user, children }) {
  let login;
  if (user) {
    login = user.login;
  }

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Some APP</title>
        <link rel="stylesheet" href="/css/deck.css" />
        <link rel="stylesheet" href="/css/layout.css" />
        <link rel="stylesheet" href="/css/header.css" />
        <link rel="stylesheet" href="/css/card.css" />
        <link rel="stylesheet" href="/css/card-info.css" />
        <script defer src="/js/client.js" />
        <script defer src="/js/main.js" />
        <script defer src="/js/header.js" />
      </head>
      <body className="body">
        <Header login={login} />
        {children}
      </body>
    </html>
  );
};
