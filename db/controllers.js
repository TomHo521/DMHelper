const pool = require('./models.js');
var format = require('pg-format');


//get all adventurers

const getAllAdventurers = function() {
  let sql = format('SELECT * FROM %I ', "Adventurer");

  return pool.query(sql)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// database interaction to get all the users in the users table.
const getUsers = function() {
  let sql = format('SELECT * FROM %I ', "Adventurer");

  return pool.query(sql)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// this function creates a user session for the user and inserts it into the BOC session db
const createNewSession = function (obj_param) {
  let { session_name, restaurant_name, restaurant_id_api, host_id } = obj_param;
  let split_method = 0;

  let sql = format(`INSERT INTO %I(%s, %s, %s, %s, %s) VALUES ('${session_name}', ${host_id}, \
                   '${restaurant_name}', '${restaurant_id_api}', ${split_method}) \
                   RETURNING "session_id"`, "BOC_Sessions", 'session_name', 'host_id', 
                   'restaurant_name', 'restaurant_id_api', 'split_method');

  return pool.query(sql)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// adds a guest to a given session UNTESTED
const updateRestaurant = function (obj_param) {
  let {restaurant_id_api, restaurant_name, session_id} = obj_param;

  let sql = format(`UPDATE %I SET %s = '${restaurant_id_api}', %s = '${restaurant_name}' \
                    WHERE (%s = '${session_id}')`, "BOC_Sessions", 'restaurant_id_api', 
                    'restaurant_name', 'session_id');

  return pool.query(sql)
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
};

// creates a new user
const createNewUser = function (obj_param) {
  let { first_name, last_name, email, password } = obj_param;

  let sql = format(`INSERT INTO %I(%s, %s, %s, %s) VALUES ('${first_name}', '${last_name}', \
                    '${email}', '${password}') RETURNING "user_id"`, "BOC_Users", 'first_name', 
                    'last_name', 'email', 'password');

  return pool.query(sql)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// adds a guest to a given session (guest must already be in users table)
const addGuest = function (obj_param) {
  let { session_id, user_id } = obj_param;

  let sql = format(`INSERT INTO %I(%s, %s, %s) VALUES ('${session_id}', '${user_id}', '0') \
                    RETURNING "user_id"`, "BOC_User-Session-jt", 'session_id', 'user_id', 'user_done_ordering');

  return pool.query(sql)
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
};

// removes a guest from a given session
const removeGuest = function (obj_param) {
  let {session_id, user_id} = obj_param;

  let sql = format(`DELETE FROM %I WHERE (%s = '${session_id}' AND %s = '${user_id}')`, 
                   "BOC_User-Session-jt", 'session_id', 'user_id');

  return pool.query(sql)
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
};

// adds an order for a given session for a given user, returning the order_id
const addOrder = function (obj_param) {
  let {orderer_id, order_session_id, food_id_api, food_name_api, price, qty, restaurant_id_api, restaurant_name_api} = obj_param;

  let sql = format(`INSERT INTO %I(%s, %s, %s, %s, %s, %s, %s, %s) VALUES ('${orderer_id}', \
                   '${order_session_id}', '${food_id_api}', '${food_name_api}', '${price}', \
                   '${qty}', '${restaurant_id_api}', '${restaurant_name_api}') RETURNING %s`,
                   "BOC_Orders", 'orderer_id', 'order_session_id', 'food_id_api', 'food_name_api',
                   'price', 'qty', 'restaurant_id_api', 'restaurant_name_api', 'order_id');

  return pool.query(sql)
    .then(res => {
      return JSON.stringify(res.rows, null, 2);
    })
    .catch(err => {
      return err;
    });
};

// updates qty of an order
const updateOrder = function (obj_param) {
  let { qty, order_id } = obj_param;

  let sql = format(`UPDATE %I SET %s = '${qty}' WHERE (%s = '${order_id}' )`, "BOC_Orders", 
                    'qty', 'order_id');

  return pool.query(sql)
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
};

// removes the order (removing it from session and user_id associations)
const removeOrder = function (obj_param) {
  let { order_id } = obj_param;

  let sql = format(`DELETE FROM %I WHERE (%s = '${order_id}')`, "BOC_Orders", 'order_id');

  return pool.query(sql)
    .then(res => {
      return 'success';
    })
    .catch(err => {
      return err;
    });
};

module.exports = {
  getUsers,
  getAllAdventurers,
  // getAllSessions,  DEPRECATED
  // getUserSession,  DEPRECATED
  createNewSession,
  updateRestaurant,
  createNewUser,
  addGuest,
  removeGuest,
  addOrder,
  updateOrder,
  removeOrder
};
