import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  checkUser, findOne, createNewUser, createAuth,
} from '../model/queryHelper';
import db from '../model/connect';
import config from '../config/config';
/**
 * Authentication class
 */
class AuthenticationController  {
  /**
     * @name createUserAccount
     * @description create a new user
     *
     */
  static createAccount(request, response) {
    // query db to check if user exist
    console.log(request.body);
    db.query(checkUser(request.body))
      .then((result) => {
        console.log(result);
        if (result.rowCount > 0) {
          console.log('FISHHHHH');
          return response.status(409).json({
            message: 'User Already exists',
          });
        }
        bcrypt.hash(request.body.password.trim(), 10)
          .then((hashedPassword) => {
            db.query(createNewUser(request.body.email,
              request.body.firstname,
              request.body.lastname))
              .then((queryResult) => {
                if (queryResult.rowCount === 0) {
                  return response.status(500).json({
                    message: 'Internal Server Error',
                  });
                }
                db.query(createAuth(
                  request.body.username,
                  hashedPassword,
                  queryResult.rows[0].id))
                  .then((authResult) => {
                    if (authResult.rowCount === 0) {
                      return response.status(500).json({
                        message: 'Internal Server Error',
                      });
                    }
                    // Generate token after creating user to automtically log in
                    const token = jwt.sign({ id: queryResult.rows[0].id },
                      config.jwtSecret, { expiresIn: 86400 });
                    return response.status(201).json({
                      message: 'User Creation Successfully',
                      data: token,
                    });
                  });
              });
          });
      });
  }

  static login(request, response) {
    db.query(findOne('*', 'auth', 'username', request.body.username))
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
