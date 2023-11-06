const models = require('../models');

const { Account } = models;

const loginPage = (req, res) => res.render('login');

const logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

const login = (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  // Error Checking
  if (!username || !pass) { return res.status(400).json({ error: 'All fields are required!' }); }
  // Check username/password with Account model
  return Account.authenticate(username, pass, (err, account) => {
    if (err || !account) { return res.status(400).json({ error: 'Wrong username or password!' }); }
    // Successful login
    req.session.account = Account.toAPI(account);
    return res.json({ redirect: '/maker' });
  });
};

const signup = async (req, res) => {
  const username = `${req.body.username}`;
  const pass = `${req.body.pass}`;
  const pass2 = `${req.body.pass2}`;
  // Error Checking
  if (!username || !pass || !pass2) { return res.status(400).json({ error: 'All fields are required!' }); }
  if (pass !== pass2) { return res.status(400).json({ error: 'Passwords do not match!' }); }
  // Hashing and creating user
  try {
    const hash = await Account.generateHash(pass);
    const newAccount = new Account({ username, password: hash });
    await newAccount.save();
    // Successfully made new user
    req.session.account = Account.toAPI(newAccount);
  } catch (err) {
    console.log(err);
    // Duplicate name
    if (err.code === 11000) { return res.status(400).json({ error: 'Username already in use!' }); }
    // Server Error
    return res.status(500).json({ error: 'An error occured!' });
  }
  return res.json({ redirect: '/maker' });
};

module.exports = {
  loginPage,
  logout,
  login,
  signup,
};
