import pg from 'pg';
import config from '../config/config';

const db = (process.env.NODE_ENV === 'test') ? new pg.Pool(config.test) : new pg.Pool(config.database);


const createUserTable = `
CREATE TABLE IF NOT EXISTS  users(
    id SERIAL PRIMARY KEY, 
    email VARCHAR(255) UNIQUE NOT NULL, 
    firstname VARCHAR(255), 
    lastname VARCHAR(255)
)`;

const createAuthTable = `
CREATE TABLE IF NOT EXISTS auth(
    id SERIAL PRIMARY KEY, 
    username VARCHAR(255) UNIQUE NOT NULL, 
    password VARCHAR(255) NOT NULL, 
    userId int, 
    CONSTRAINT FK_UserAuth FOREIGN KEY (userId) REFERENCES users(id)
)`;

const createEntryTable = `
CREATE TABLE IF NOT EXISTS entries(
    id SERIAL PRIMARY KEY, 
    title VARCHAR(255)  NOT NULL, 
    note VARCHAR(255) NOT NULL, 
    is_favourite BOOLEAN,
    created_at TIMESTAMP Default Now(),
    updated_at TIMESTAMP Default Now(),
    userId int, 
    CONSTRAINT FK_UserEntries FOREIGN KEY (userId) REFERENCES users(id)
   
)`;

db.query(createUserTable).then((res) => {
  if (res) {
    console.log('User table created  successfullyy');
  } else {
    console.log('Error creating User table');
  }
  db.query(createAuthTable).then((res) => {
    if (res) {
      console.log('Auth table created successfullyy');
    } else {
      console.log('Error creating Auth table');
    }
    db.query(createEntryTable).then((res) => {
      if (res) {
        console.log('Entry table created successfullyy');
      } else {
        console.log('Error creating entry table');
      }
      db.end();
    });
  });
});
