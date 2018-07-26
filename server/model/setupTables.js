import db from '../config/connect';

db.query('CREATE TABLE users(id SERIAL PRIMARY KEY, email VARCHAR(255) UNIQUE NOT NULL, firstname VARCHAR(255), lastname VARCHAR(255))');
db.query('CREATE TABLE auth(id SERIAL PRIMARY KEY, username VARCHAR(255) UNIQUE NOT NULL, password VARCHAR(255) NOT NULL, userId int, CONSTRAINT FK_UserAuth FOREIGN KEY (userId) REFERENCES users(id))');
db.query('CREATE TABLE entries(id SERIAL PRIMARY KEY, title VARCHAR(255)  NOT NULL, note VARCHAR(255) NOT NULL, userId int, CONSTRAINT FK_UserEntries FOREIGN KEY (userId) REFERENCES users(id), isFavourite BOOLEAN,createdDate TIMESTAMP Default Now(),updatedDate TIMESTAMP Default Now())');

db.end();
