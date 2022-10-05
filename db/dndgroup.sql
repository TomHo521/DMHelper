
DROP DATABASE IF EXISTS "DMHelper";

CREATE DATABASE "DMHelper";
\c "DMHelper";

CREATE TABLE "Adventurer" (
	id serial primary key,
	title varchar(255),
	lvl smallint,
	race varchar(50),
	class varchar(25),
	currenthp smallint,
	maxhp smallint,
	height smallint,
	mass smallint,
	weapon varchar(100),
	armor varchar(100),
	ac smallint,
	speed smallint,
	xp integer,
	currentmp smallint,
	maxmp smallint,
	x smallint,
	y smallint,
	z smallint,
	strength smallint,
	constitution smallint,
	charisma smallint,
	dexterity smallint,
	wisdom smallint,
	intellect smallint,
	equipment varchar(255),
	inventory varchar(255),
	class_selections varchar(255),
	gold integer);


CREATE TABLE "Adventurer-invariant-stat" (
id SERIAL PRIMARY KEY,
player_name varchar(255),
current_hp smallint,
max_hp smallint,
ss varchar(25),
weapon varchar(255),
armor_class varchar(255),
speed smallint,
tagline varchar(255),
lvl smallint,
class varchar(25),
race varchar(25),
height varchar(25),
player_weight varchar(25),
gold integer,
xp integer,
player_location varchar(255),
spell_modifier varchar(15),
class_traits text,
equipped varchar(255)
);


CREATE TABLE "Adventurer-stat" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	strength SMALLINT,
	constitution SMALLINT,
	charisma SMALLINT,
	dexterity SMALLINT,
	wisdom SMALLINT,
	intellect SMALLINT
);

CREATE TABLE "Adventurer-longstat" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	inventory TEXT,
	saving_throw TEXT,
	skills TEXT,
	attack varchar(255),
	weapons_prof varchar(255),
	armor_prof varchar(255),
	rest_level smallint,
	position varchar(27)
);

/* new SQL statements */

-- CREATE TABLE "BOC_User-Session-jt" (
-- id SERIAL PRIMARY KEY,
-- session_id INTEGER,
-- user_id INTEGER,
-- user_done_ordering BOOLEAN
-- );

-- CREATE TABLE "BOC_Orders" (
--   order_pk SERIAL,
--   orderer_id INTEGER NOT NULL DEFAULT NULL,
--   order_session_id INTEGER NOT NULL DEFAULT NULL,
--   food_id_api INTEGER NOT NULL DEFAULT NULL,
--   food_name_api VARCHAR(100) NULL DEFAULT NULL,
--   price DECIMAL NOT NULL DEFAULT NULL,
--   qty INTEGER NOT NULL DEFAULT 1,
--   restaurant_id_api BIGINT NULL DEFAULT NULL,
--   restaurant_name_api VARCHAR(75) NOT NULL DEFAULT 'NULL',
--   currency VARCHAR(7) NULL DEFAULT 'usd',
--   PRIMARY KEY (order_pk)
-- );




-- CREATE TABLE "BOC_user" (
-- 	id SERIAL PRIMARY KEY,
-- 	first_name VARCHAR(55),
-- 	last_name VARCHAR(55)
-- );

-- CREATE TABLE "BOC_Friendship" (
-- 	friendship_id integer,
-- 	inviter_id integer,
-- 	invitee_id integer
-- );

-- CREATE TABLE "BOC_Sessions" (
-- 	session_pk SERIAL PRIMARY KEY,
-- 	session_name VARCHAR(75),
-- 	host_id integer,
-- 	participants_id integer,
-- 	restaurant_name VARCHAR(90),
-- 	order_id integer,
-- 	split_method integer
-- );

-- CREATE TABLE "BOC_Session_participants" (
-- 	session_fk integer,
-- 	user_id integer,
-- 	order_item integer,
-- 	item_price real
-- );


-- INSERT INTO "BOC_Sessions"(session_name, host_id, participants_id, restaurant_name, order_id, split_method) VALUES ('Dining with the X-Men', 8, 1, 'THe X Mansion', 1, 1);

-- Create TABLE "BOC_restaurants" (
-- 	id SERIAL,
-- 	restaurant_record_id integer,
-- 	data jsonb
-- );




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

-- CREATE DATABASE "DMHelper";

-- USE DATABASE "DMHelper";


INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, 
mass, weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, 
constitution, charisma, dexterity, wisdom, intellect, equipment, inventory, 
class_selections, gold) VALUES ('Midir', 3, 'human', 'warlock', 45, 55, 68, 160,
'demon blade 1d6', 'cloth armor', 15, 30, 454, 2, 4, 0, 0, 0, 15, 15, 15, 15, 15,
15, 'explorer pack', '5 potions', 'none yet', 5); 

INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, mass, weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, constitution, charisma, dexterity, wisdom, intellect, equipment, 
inventory, class_selections, gold) 
VALUES('Zovinar', 3, 'human', 'fighter', 45, 55, 68, 160, 'longsword 1d8', 
'chain mail', 15, 30, 454, 2, 4, 0, 0, 0, 15, 15, 15, 15, 15, 15, 
'dungeoneer pack', '5 potions', 'none yet', 5); 

INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, mass,
 weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, constitution,
charisma, dexterity, wisdom, intellect, equipment, inventory, class_selections, 
gold) VALUES ('Pergilius Von Waxilium', 3, 'human', 'bard', 45, 55, 68, 160, 
'flute of questionable decency 1d7', 'leather armor', 15, 30, 454, 2, 4, 0, 0, 
0, 15, 15, 15, 15, 15, 15, 'health pack', '5 potions', 'none yet', 5); 

INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, mass,
 weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, constitution,
charisma, dexterity, wisdom, intellect, equipment, inventory, class_selections,
 gold) VALUES ('Po', 3, 'human', 'bard', 45, 55, 68, 160, 'fists of fury 1d6', 
 'leather armor', 15, 30, 454, 2, 4, 0, 0, 0, 15, 15, 15, 15, 15, 15, 
 'dungeoneer pack', '5 potions', 'none yet', 5); 

INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, mass,
 weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, constitution,
charisma, dexterity, wisdom, intellect, equipment, inventory, class_selections, 
gold) VALUES ('Cassian', 3, 'elf', 'rogue',  45, 55, 68, 160, 
'hand crossbow 1d6', 'leather armor', 15, 30, 454, 2, 4, 0, 0, 0, 15, 15, 15, 
15, 15, 15, 'bag of tricks', '5 potions', 'none yet', 5); 

INSERT INTO "Adventurer" (title, lvl, race, class, currenthp, maxhp, height, mass,
 weapon, armor, ac, speed, xp, currentmp, maxmp, x, y, z, strength, constitution,
  charisma, dexterity, wisdom, intellect, equipment, inventory, class_selections,
	 gold) VALUES ('Lia', 3, 'human', 'fighter',  45, 55, 68, 160, 'longsword 1d8',
	  'chain mail', 15, 30, 454, 2, 4, 0, 0, 0, 15, 15, 15, 15, 15, 15, 
		'dungeoneer pack', '5 potions', 'none yet', 5); 
