import pg from 'pg';
import config from '../config/config';

const db = (process.env.NODE_ENV === 'test') ? new pg.Pool(config.test) : new pg.Pool(config.database);


const dropUser = `
DROP TABLE IF EXISTS users`;

const dropAuth = `
DROP TABLE IF EXISTS auth`;

const dropEntry = `
DROP TABLE IF EXISTS entries`;


db.query(dropAuth).then((res) => {
  if (res) {
    //console.log('auth table dropped  successfully');
  } else {
    //console.log('Error dropping auth table');
  }
  db.query(dropEntry).then((res) => {
    if (res) {
      //console.log('entries table dropped successfuly');
    } else {
      //console.log('Error dropping  entries table');
    }
    db.query(dropUser).then((res) => {
      if (res) {
        //console.log('users table dropped successfully');
      } else {
        //console.log('Error dropping User table');
      }
      db.end();
    });
  });
});
