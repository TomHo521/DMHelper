
DROP DATABASE IF EXISTS "DMHelper";

CREATE DATABASE "DMHelper";
\c "DMHelper";


CREATE TABLE "Adventurer" (
	adventurer_id SERIAL PRIMARY KEY,
	title varchar(255),
	lvl SMALLINT,
	race varchar(50),
	class varchar(50),
	currenthp smallint,
	maxhp smallint,
	height smallint,
	mass smallint,
	weapon varchar(100),
	armor varchar(100),
	ac smallint,
	speed smallint,
	xp integer,
	currentmp integer,
	maxmp integer,
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
	gold integer
	);



CREATE TABLE "Adventurer-v2" (
	adventurer_id serial primary key,
	title varchar(255),
	tagline varchar(255),
	lvl smallint,
	race varchar(50),
	class varchar(25),
	currenthp smallint,
	maxhp smallint,
	currentss varchar(10),
	maxss varchar(10),
	height smallint,
	mass smallint,

	speed smallint,
	gold integer
	xp integer,
	located varchar(25),

/* future changes: further elaboration at class table */
	class_id integer,

/* future changes: further elaboration at equipped table */
	weapon varchar(100),
	armor varchar(100),
	ac smallint,

/* further elaboration at stat table */
	strength smallint,
	constitution smallint,
	charisma smallint,
	dexterity smallint,
	wisdom smallint,
	intellect smallint,
	);


CREATE TABLE "stats" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	strength SMALLINT,
	constitution SMALLINT,
	charisma SMALLINT,
	dexterity SMALLINT,
	wisdom SMALLINT,
	intellect SMALLINT,
);

CREATE TABLE "equipped" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	weapon varchar(100),
	weaponStat varchar(5),
	armor varchar(100),
	armorStat varchar(5),
);

CREATE TABLE "inventory" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	item varchar(255),
	item_id INTEGER,
);

CREATE TABLE "saving-throw" (
	id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	strength SMALLINT,
	constitution SMALLINT,
	charisma SMALLINT,
	dexterity SMALLINT,
	wisdom SMALLINT,
	intellect SMALLINT,
);

CREATE TABLE "skills" (
	skills_id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
	stat_class varchar(10),
	stat_name varchar(25),
	proficiency_class SMALLINT,
);

CREATE TABLE "master_item_table" (
	item_id SERIAL PRIMARY KEY,
	item_description varchar(255),
)

CREATE TABLE "master_weapon_table" (
	weapon_id SERIAL PRIMARY KEY,
	weapon_description varchar(255),
	weapon_dmg_main varchar(5),
	weapon_dmg_secondary varchar(5),
	weapon_effect_main varchar(10),
	weapon_effect_secondary varchar(10),
	weapon_global_effect varchar(10),
	weapon_sell_price integer,
	weapon_don_cost varchar(25),
	weapon_doff_cost varchar(25),
	weapon_handedness varchar(25),
)

CREATE TABLE "master_armor_table" (
	armor_id SERIAL PRIMARY KEY,
	armor_description varchar(255),
	armor_ac integer,
	armor_effect_main varchar(10),
	armor_effect_secondary varchar(10),
	armor_global_effect varchar(10),
	armor_sell_price integer,
	armor_don_cost varchar(25),
	armor_doff_cost varchar(25),
	armor_body_type varchar(25),
)

CREATE TABLE "master_spell_table" (
	spell_id SERIAL PRIMARY KEY,
	spell_description varchar(255),
	spell_dmg_main varchar(5),
	spell_dmg_secondary varchar(5),
	spell_effect_main varchar(10),
	spell_effect_secondary varchar(10),
	spell_global_effect varchar(10),
	spell_somatic_cost varchar(25),
	spell_verbal_cost varchar(25),
	spell_material_cost varchar(25),
	spell_casting_cost varchar(25),
)

/* something like this for each class */
/* each adventurer later augmented with list of spellIds */

CREATE TABLE "Bard" (
	spell_id SERIAL PRIMARY KEY,
	spell_name varchar(100),
	lvl_obtain smallint,
	effect varchar(250),
);


CREATE TABLE "party-id" (
	party_id SERIAL PRIMARY KEY,
	adventurer_id INTEGER,
)


CREATE TABLE "chat-log" (
	chatmsg_id SERIAL PRIMARY KEY,
	party_id INTEGER,
	msg varchar(255),
	speaker varchar(50),
	speaker_id INTEGER,
	recipient varchar(255),
	time_said timestamp, 
)




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
