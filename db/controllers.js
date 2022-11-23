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

const getAdventurer = function() {
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
const updateAdventurer = function (obj_param) {
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
const createNewAdventurer = function (obj_param) {
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



// removes a guest from a given session
const deleteAdventurer = function (obj_param) {
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




module.exports = {
  getAllAdventurers,
  createNewSession,
  //CRUD
  createNewAdventurer,
  getAdventurer,
  updateAdventurer,
  deleteAdventurer,
};
