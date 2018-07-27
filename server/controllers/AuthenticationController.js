import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import AuthHelper from '../helpers/AuthHelper';
import {
  find, createNewUser, createAuth,
} from '../model/queryHelper';
import db from '../model/setupTables';
import config from '../config/config';

class AuthenticationController {
  /**
     * @name createUserAccount
     * @description create a new user
     *
     */
  static createAccount(request, response) {
    const error = AuthHelper.verifyRequest(request.body);
    if (error) {
      return response.status(400).json({ message: error });
    }
    // query db to check if user exist
    db.query(find('email', 'users', 'email', request.body.email))
      .then((result) => {
        if (result.rowCount > 0) {
          return response.status(409).json({ message: 'User already exists' });
        }
        // query db to check if username exists
        db.query(find('id', 'auth', 'username', request.body.username))
          .then((result) => {
            if (result.rowCount > 0) {
              return response.status(409).json({ message: 'Username already exists' });
            }
            const hashedPassword = bcrypt.hashSync(request.body.password.trim(), 10);
            db.query(createNewUser(request.body.email, request.body.firstname, request.body.lastname))
              .then((queryResult) => {
                if (queryResult.rowCount === 0) {
                  return queryResult.status(500).json({ message: 'Unable to create user' });
                }
                db.query(createAuth(request.body.username, hashedPassword, queryResult.rows[0].id))
                  .then((authResult) => {
                    if (authResult.rowCount === 0) {
                      return authResult.status(500).json({ message: 'Unable to create auth' });
                    }
                    // Generate token after creating user to automtically log in
                    const token = jwt.sign({ id: queryResult.rows[0].id },
                      config.jwtSecret, { expiresIn: 86400 });
                    return response.status(201).json({
                      message: 'User Creation successful',
                      email: queryResult.rows[0].email,
                      token,
                    });
                  });
              });
          });
      });
    return null;
  }

  static login(request, response) {
    db.query(find('*', 'auth', 'username', request.body.username))
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).json({ message: 'Invalid username or password' });
        }
        // Check if password is valid/Matched
        const validatePassword = bcrypt.compareSync(request.body.password.trim(),
          result.rows[0].password);
        if (validatePassword) {
          // create new token if user exists, token expires in next 24 hours
          const token = jwt.sign({ id: result.rows[0].id },
            config.jwtSecret, { expiresIn: 86400 });
          return response.status(200).json({
            message: 'User login successfully',
            email: result.rows[0].email,
            token,
          });
        }
        return response.status(400).json({ message: 'Invalid username or password' });
      });
  }
}

export default AuthenticationController;
