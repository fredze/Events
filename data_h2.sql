DELETE FROM CATEGORY;
DELETE FROM EVENT;

INSERT INTO CATEGORY(NAME, DESCRIPTION) VALUES('Music', 'Concerts, festivals');
INSERT INTO CATEGORY(NAME, DESCRIPTION) VALUES('Sports', 'Soccer, football, tennis');
INSERT INTO CATEGORY(NAME, DESCRIPTION) VALUES('Theatre', 'Operas, plays');

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Concert Future', 147.45, 'Me', 500, 128, to_date('2018-09-29', 'yyyy-mm-dd'), 'Lyon', 'Wait for the one and only Future, in Lyon for an unforgettable night.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Music' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Concert Young Thug', 91.0, 'Me', 400, 211, to_date('2018-09-30', 'yyyy-mm-dd'), 'Berlin', 'Young thug''s concert in Berlin in his tour of Europe will take place in the stadium. There are a lot of surprises, stay tuned.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Music' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Concert Migos', 180.90, 'Me', 3000, 302, to_date('2018-11-30', 'yyyy-mm-dd'), 'Paris', 'Offset, Quavo and Takeoff! Listen to the brand new album of Migos LIVE in Parc Des Princes. Be there at 8 P.M.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Music' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('New Year''s Eve Festival', 410.0, 'Me', 8000, 99, to_date('2018-12-31', 'yyyy-mm-dd'), 'Ibiza', 'Live the new year''s experience with DJ Khaled, Drake, Eminem, Cardi B and Maitre Gims in IBIZA!', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Music' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Italian Opera', 12.11, 'Me', 400, 0, to_date('2019-06-30', 'yyyy-mm-dd'), 'Madrid', 'For the first time, exclusively on EVE, you can attend the famous italian opera with the majestic and unique artists.', 'UNAVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Theatre' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Swan Lake', 48.50, 'Me', 250, 8, to_date('2018-10-01', 'yyyy-mm-dd'), 'القاهرة', 'Get ready for the amazing opera experience in the great Egypt. Don''t miss the fantastic Swan Lake.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Theatre' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Les Miserables', 15.0, 'Me', 250, 100, to_date('2019-12-28', 'yyyy-mm-dd'), 'Geneva', 'Get ready for the recreation of Victor Hugo Les Miserables in a musical performance that will take your breath away.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Theatre' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Phèdre', 22.0, 'Me', 180, 25, to_date('2018-12-17', 'yyyy-mm-dd'), 'Dubai, Burj Khalifa Theatre', 'Phèdre, Racine''s dramatic tragedy, will be played in Burj Khalifa theatre by the American University students.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Theatre' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Arsenal - Chelsea', 449.90, 'Me', 2500, 1000, to_date('2019-04-29', 'yyyy-mm-dd'), 'London, Emirates Stadium', 'Hurry up and buy your places for the CHAMPIONS LEAGUE SEMI-FINAL!', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Sports' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Lakers - Celtics', 1199.99, 'Me', 900, 338, to_date('2019-01-14', 'yyyy-mm-dd'), 'Los Angeles', 'Don''t miss out THE Derby', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Sports' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('Nadal - Federer', 299.99, 'Me', 700, 238, to_date('2019-01-05', 'yyyy-mm-dd'), 'Lisbon', 'Wimbeldon''s final', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Sports' LIMIT 1));

INSERT INTO
EVENT(NAME, PRICE, RESPONSABLE, TOTAL_PLACES, AVAILABLE_PLACES, DATE_EVENT, PLACE_EVENT, DESCRIPTION, STATE_EVENT, CATEGORY_ID)
VALUES('FC Barcelona - Real Madrid', 799.0, 'Me', 6000, 638, to_date('2019-02-27', 'yyyy-mm-dd'), 'Barcelona', 'El clasico, enough said.', 'AVAILABLE', (SELECT ID FROM CATEGORY WHERE NAME='Sports' LIMIT 1));
