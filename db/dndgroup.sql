

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

