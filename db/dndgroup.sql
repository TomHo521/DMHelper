


/* new SQL statements */

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

INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Midir', '', 'iheartjeangrey@gmail.com', '1234');
INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Zovinar', '', 'iheartlogan@gmail.com', '1234');
INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Pergilius Von Waxilium', 'Lee', 'ijoinedgenx@gmail.com', '1234');
INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Po', 'James Howlett', 'jeangreyisok@gmail.com', '1234');
INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Cassian', 'Etienne LeBeau', 'iheartrogue@gmail.com', '1234');
INSERT INTO "Adventurer"(first_name, last_name, email, password) VALUES ('Lia', 'MarieRogue', 'iheartgambit@gmail.com', '1234');

INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('Dining with the X-Men', 8, 1, 'THe X Mansion', 1, 1);

Create TABLE "BOC_restaurants" (
	id SERIAL,
	restaurant_record_id integer,
	data jsonb
);




/* Relation 'Questions-Answers' */
/*
ALTER TABLE "Answers" ADD CONSTRAINT "Questions-Answers"
FOREIGN KEY (question_id)
REFERENCES "Questions"(id);*/

/* Relation 'photos-Answers' */
/*
ALTER TABLE "Answers" ADD CONSTRAINT "photos-Answers"
FOREIGN KEY (photos)
REFERENCES photos(id);
*/

/*

CREATE INDEX idx_Answers_question_id ON "Answers" (question_id);
CREATE INDEX idx_photos_answer_id ON photos (answer_id);
CREATE INDEX idx_Questions_product_id ON "Questions" (product_id);

*/

CREATE TABLE "Adventurer" (
id integer,
name varchar(255),
class varchar(25),
tagline varchar(255),
maxhp smallint,
currenthp smallint,
xp integer,
maxmp integer,
currentmp integer,
ac smallint,
speed smallint,
x smallint,
y smallint,
z smallint,
str smallint,
con smallint,
cha smallint,
dex smallint,
wis smallint,
intellect smallint,
equipment varchar(255),
inventory varchar(255),
selections varchar(255),
gold integer,
primary key(id));

