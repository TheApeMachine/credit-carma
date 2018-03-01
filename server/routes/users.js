var express = require('express');
var router  = express.Router();
const knex  = require('../db/knex');
var bcrypt  = require('bcrypt-nodejs');

var luhnChk = (function (arr) {
    return function (ccNum) {
        var
            len = ccNum.length,
            bit = 1,
            sum = 0,
            val;

        while (len) {
            val = parseInt(ccNum.charAt(--len), 10);
            sum += (bit ^= 1) ? arr[val] : val;
        }

        return sum && sum % 10 === 0;
    };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

function validUser(user) {
  return typeof user.first_name == 'string' &&
                user.first_name.trim() != '' &&
         typeof user.last_name == 'string' &&
                user.last_name.trim() != '' &&
                luhnChk(user.card_number);
}

router.get('/:id', function(req, res) {
  const id = req.params.id;

  if(typeof(id) != 'undefined') {
    knex('users').select().where('id', id).first().then(user => {
      res.render('users/show', {user: user});
    });
  }
  else {
    res.status(404);
    res.render('error', {
      message: 'User not found'
    });
  }
});

router.post('/', function(req, res) {
  if(validUser(req.body)) {
    const cur_date   = new Date()
    const cur_year   = cur_date.getFullYear().toString();
    const now        = cur_date.toLocaleString();
    const date_day   = '01';
    const date_month = req.body.expires_on.split('/')[0];
    const date_year  = cur_year.substr(0, 2) + req.body.expires_on.split('/')[1];
    const salt       = bcrypt.genSaltSync(10);
    const crypt_card = bcrypt.hashSync(req.body.card_number, salt);
    const crypt_cvv  = bcrypt.hashSync(req.body.cvv, salt);

    const user = {
      first_name:  req.body.first_name,
      last_name:   req.body.last_name,
      card_number: crypt_card,
      cvv:         crypt_cvv,
      salt:        salt,
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
    res.status(422);
    res.render('error', {
      message: 'Invalid user'
    });
  }
});

module.exports = router;
