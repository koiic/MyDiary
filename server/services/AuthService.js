import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../model/connect';
import config from '../config/config';
import { createAuth, createNewUser,} from '../model/queryHelper';
import BaseService from './BaseService';


class AuthenticationService extends BaseService {
  static createUserAccount(requestData) {
    // query db to check if user exist
    db.query(`SELECT email,username FROM users LEFT OUTER JOIN auth ON users.id = auth.id WHERE email = '${requestData.email}' or username = '${requestData.username}'`)
      .then((result) => {
        if (result.rowCount > 0) {

          return this.conflictError('User already exists');
        }
        bcrypt.hash(requestData.password.trim(), 10)
          .then((hashedPassword) => {
            db.query(createNewUser(requestData.email,
              requestData.firstname,
              requestData.lastname))
              .then((queryResult) => {
                if (queryResult.rowCount === 0) {
                  return this.internalServerError('Internal Server error');
                }
                db.query(createAuth(
                  requestData.username, 
                  hashedPassword, 
                  queryResult.rows[0].id))
                  .then((authResult) => {
                    if (authResult.rowCount === 0) {
                      return this.internalServerError('Internal Server error');
                    }
                    // Generate token after creating user to automtically log in
                    const token = jwt.sign({ id: queryResult.rows[0].id },
                      config.jwtSecret, { expiresIn: 86400 });
                    return this.createdSuccessfully('User created successfully', token);
                  });
              });
          });
      });
  }
}

export default AuthenticationService;
