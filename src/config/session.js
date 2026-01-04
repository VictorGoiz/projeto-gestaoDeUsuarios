const session = require('express-session');

module.exports = session({
  secret: 'segredo123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax'
  }
});