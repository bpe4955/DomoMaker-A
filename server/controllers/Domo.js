const models = require('../models');

const { Domo } = models;

const makerPage = async (req, res) => {
  try {
    const query = { owner: req.session.account._id };
    const docs = await Domo.find(query).select('name age').lean().exec();
    return res.render('app', { domos: docs });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: 'Error retrieving domos!' });
  }
};

const makeDomo = async (req, res) => {
  // Error Checking
  if (!req.body.name || !req.body.age) {
    return res.status(400).json({ error: 'Both name and age are required!' });
  }

  const domoData = {
    name: req.body.name,
    age: req.body.age,
    owner: req.session.account._id,
  };

  try {
    const newDomo = new Domo(domoData);
    await newDomo.save();
  } catch (err) {
    console.log(err);
    if (err.code === 11000) { return res.status(400).json({ error: 'Domo already exists!' }); }
    return res.status(500).json({ error: 'An error occured making domo!' });
  }
  return res.json({ redirect: '/maker' });
};

module.exports = {
  makerPage,
  makeDomo,
};
