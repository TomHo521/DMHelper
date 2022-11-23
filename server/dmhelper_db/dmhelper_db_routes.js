const express = require('express');
const router = express.Router();
const db = require('../../db/controllers.js');
// const testgetrestaurant_1 = require('./testgetrestaurant_1');
// const testmenu_1 = require('./testmenu_1');
// const testRestaurantsByZip = require('./testRestaurantsByZip_1');
// const testSession = require('./getSession');


router.get('/getSession', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testSession, null, 2));
});

router.get('/testzip', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testRestaurantsByZip, null, 2));
});

router.get('/testgetRestaurant_1', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testgetrestaurant_1, null, 2));
});

router.get('/testmenu_1', (req, res) => {
  res.header('Content-Type', 'application/json');
  res.status(200).send(JSON.stringify(testmenu_1, null, 2));
});

// FOR INTERNAL USAGE ONLY

router.get('/getAllAdventurers', (req, res) => {

  db.getAllAdventurers()
  .then(result => {
    res.header('Content-Type', 'application/json');
    res.status(200).send(result);
  })
  .catch(err => {
    res.status(400).send(err);
  });

});






// login route to test
router.get('/login', (req, res) => {
  // gets the user password to check for validation from here

  // let obj_params = {
  //   email: req.query.hostname,
  //   password: req.query.password
  // };

  let obj_params = {
    email: 'iheartcharlesxavier@gmail.com',
    password: '9999'
  };

  db.login(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      // the result of this should return the created session id.
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send('login failure!');
    });
});

// creates a new Session for a given Schema
router.post('/createNewSession', (req, res) => {
  let obj_params = {
    session_name: req.query.session_name,
    restaurant_name: req.query.restaurant_name,
    restaurant_id_api: req.query.restaurant_id_api,
    host_id: req.query.host_id,
  };

  db.createNewSession(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      // the result of this should return the created session id.
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// creates a new Session for a given Schema
router.get('/createNewSession', (req, res) => {

  let obj_params = {
    session_name: req.query.session_name,
    restaurant_name: req.query.restaurant_name,
    restaurant_id_api: req.query.restaurant_id_api,
    host_id: req.query.host_id,
  };

  db.createNewSession(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      // the result of this should return the created session id.
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});


// updates the restaurant for a particular session
router.get('/createNewUser', (req, res) => {
  let obj_params = {
    first_name: req.query.first_name,
    last_name: req.query.last_name,
    email: req.query.email,
    password: req.query.password,
  };

  db.createNewUser(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds a guest to a particular session
router.post('/addGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.query.session_id,
    user_id: req.query.user_id,
  };

  db.addGuest(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// removes a guest from the session
router.post('/removeGuest', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    session_id: req.query.session_id,
    user_id: req.query.user_id,
  };

  db.removeGuest(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds an order with respect to a guest to a particular session
router.get('/addOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_session_id: req.query.session_id,
    orderer_id: req.query.user_id,
    food_id_api: req.query.food_id_api,
    food_name_api: req.query.food_name_api,
    price: req.query.price,
    qty: req.query.qty,
    restaurant_id_api: req.query.restaurant_id_api,
    restaurant_name_api: req.query.restaurant_name_api,
  };

  db.addOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// adds an order with respect to a guest to a particular session
router.post('/addOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_session_id: req.query.session_id,
    orderer_id: req.query.user_id,
    food_id_api: req.query.food_id_api,
    food_name_api: req.query.food_name_api,
    price: req.query.price,
    qty: req.query.qty,
    restaurant_id_api: req.query.restaurant_id_api,
    restaurant_name_api: req.query.restaurant_name_api,
  };

  db.addOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

// updates an order with respect to a guest to a particular session
router.put('/updateOrder', (req, res) => {
  // extract the proper parameters here
  let obj_params = {
    order_id: req.query.order_id,
    qty: req.query.qty,
  };

  db.updateOrder(obj_params)
    .then(result => {
      res.header('Content-Type', 'application/json');
      res.status(200).send(result);
    })
    .catch(err => {
      res.status(400).send(err);
    });
});



module.exports = router;