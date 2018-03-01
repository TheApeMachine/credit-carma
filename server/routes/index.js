var express = require('express');
var router = express.Router();

const knex = require('../db/knex');

function validUser(user) {
  return typeof user.first_name == 'string' &&
                user.first_name.trim() != '' &&
         typeof user.last_name == 'string' &&
                user.last_name.trim() != '';
}

router.get('/', function(req, res) {
  res.render('index', { title: 'Credit Carma' });
});

router.post('/users', function(req, res) {
  if(validUser(req.body)) {
    const now        = new Date().toLocaleString();
    const date_day   = '01';
    const date_month = req.body.expires_on.split('/')[0];
    const date_year  = '20' + req.body.expires_on.split('/')[1];

    const user = {
      first_name:  req.body.first_name,
      last_name:   req.body.last_name,
      card_number: req.body.card_number,
      cvv:         req.body.cvv,
      expires_on:  date_year + '/' + date_month + '/' + date_day,
      created_at:  now,
      updated_at:  now
    };

    knex('users').insert(user, 'id').then(ids => {
      const id = ids[0];
      res.redirect(`/users/${id}`);
    });
  }
  else {

  }
});

module.exports = router;
