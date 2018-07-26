import pg from 'pg';
import config from '../config/config';

const db = (process.env.NODE_ENV === 'test') ? new pg.Pool(config.test) : new pg.Pool(config.database);


const dropUserTable = `
  DROP TABLE users`;

const dropAuthTable = `
  DROP TABLE auth`;

const dropEntryTable = `
  DROP TABLE entries`;


db.query(dropAuthTable).then((res) => {
  if (res) {
    console.log('auth table dropped  successfully');
  } else {
    console.log('Error dropping auth table');
  }
  db.query(dropEntryTable).then((res) => {
    if (res) {
      console.log('entries table dropped successfuly');
    } else {
      console.log('Error dropping  entries table');
    }
    db.query(dropUserTable).then((res) => {
      if (res) {
        console.log('users table dropped successfully');
      } else {
        console.log('Error dropping User table');
      }
      db.end();
    });
  });
});
