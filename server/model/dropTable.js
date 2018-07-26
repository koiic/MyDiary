import db from '../config/connect';

try {
  db.query(' DROP TABLE users');
  db.query(' DROP TABLE auth');
  db.query(' DROP TABLE entries');
  db.end();
} catch (error) {
  console.log(error);
}
