const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  // name of the EC2 server IP
  host: process.env.HOST,
  database: process.env.DATABASE_NAME,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

console.log(process.env.DATABASE_NAME);

pool.connect();

module.exports = pool;


/* new SQL statements

CREATE TABLE "BOC_User-Session-jt" (
id SERIAL PRIMARY KEY,
session_id INTEGER,
user_id INTEGER,
user_done_ordering BOOLEAN
);

CREATE TABLE "BOC_Orders" (
  order_pk SERIAL,
  orderer_id INTEGER NOT NULL DEFAULT NULL,
  order_session_id INTEGER NOT NULL DEFAULT NULL,
  food_id_api INTEGER NOT NULL DEFAULT NULL,
  food_name_api VARCHAR(100) NULL DEFAULT NULL,
  price DECIMAL NOT NULL DEFAULT NULL,
  qty INTEGER NOT NULL DEFAULT 1,
  restaurant_id_api BIGINT NULL DEFAULT NULL,
  restaurant_name_api VARCHAR(75) NOT NULL DEFAULT 'NULL',
  currency VARCHAR(7) NULL DEFAULT 'usd',
  PRIMARY KEY (order_pk)
);

*/



/* asserted SQL statements


CREATE TABLE "BOC_user" (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(55),
	last_name VARCHAR(55)
);

CREATE TABLE "BOC_Friendship" (
	friendship_id integer,
	inviter_id integer,
	invitee_id integer
);

CREATE TABLE "BOC_Sessions" (
	session_pk SERIAL PRIMARY KEY,
	session_name VARCHAR(75),
	host_id integer,
	participants_id integer,
	restaurant_name VARCHAR(90),
	order_id integer,
	split_method integer
);

CREATE TABLE "BOC_Session_participants" (
	session_fk integer,
	user_id integer,
	order_item integer,
	item_price real
);

INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Scott', 'Summers', 'iheartjeangrey@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Jean', 'Grey', 'iheartlogan@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Jubilation', 'Lee', 'ijoinedgenx@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Logan', 'James Howlett', 'jeangreyisok@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Remy', 'Etienne LeBeau', 'iheartrogue@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Anna', 'MarieRogue', 'iheartgambit@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Hank', 'McCoy', 'iheartscience@gmail.com', '1234');
INSERT INTO "BOC_Users"(first_name, last_name, email, password) VALUES ('Charles', 'Xavier', 'iheartmutantkind@gmail.com', '1234');
INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('Dining with the X-Men', 8, 1, 'THe X Mansion', 1, 1);

Create TABLE "BOC_restaurants" (
	id SERIAL,
	restaurant_record_id integer,
	data jsonb
);

*/