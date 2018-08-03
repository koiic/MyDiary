import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {
  checkUser, findUser, findUserById, createNewUser, createAuth,
} from '../model/queryHelper';
import db from '../model/connect';
import config from '../config/config';
import Validation from '../helpers/Validation';
/**
 * Authentication class
 */
class AuthenticationController {
  /**
     * @name createUserAccount
     * @description create a new user
     *
     */
  static createAccount(request, response) {
    const validPassword = Validation.isPassword(request.body.password);
    if (!validPassword) {
      return response.status(400).json({ message: 'Password should not be lesser than 4' });
    }

    // query db to check if user exist
    db.query(checkUser(request.body))
      .then((result) => {
        if (result.rowCount > 0) {
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
                  queryResult.rows[0].id,
                ))
                  .then((authResult) => {
                    if (authResult.rowCount === 0) {
                      return response.status(500).json({
                        message: 'Internal Server Error',
                      });
                    }
                    // Generate token after creating user to automtically log in
                    const token = jwt.sign({ userId: queryResult.rows[0].id },
                      config.jwtSecret, { expiresIn: 86400 });
                    return response.status(201).json({
                      status: 'success',
                      message: 'User Creation Successfully',
                      user: authResult.rows,
                      data: token,
                    });
                  });
              });
          });
      })
      .catch(err => err);
  }

  static login(request, response) {
    db.query(findUser('*', 'auth', 'username', request.body.username))
      .then((result) => {
        if (result.rowCount === 0) {
          return response.status(400).json({ message: 'Invalid username or password' });
        }
        // Check if password is valid/Matched
        const validatePassword = bcrypt.compareSync(request.body.password.trim(),
          result.rows[0].password);
        if (validatePassword) {
          // create new token if user exists, token expires in next 24 hours
          const token = jwt.sign({ userId: result.rows[0].id },
            config.jwtSecret, { expiresIn: 86400 });
          return response.status(200).json({
            status: 'success',
            message: 'User login successfully',
            username: result.rows[0].username,
            token,
          });
        }
        return response.status(400).json({ message: 'Invalid username or password' });
      })
      .catch(err => err);
  }

  static fetchProfile(request, response) {
    const { userId } = request.decoded;

    const result = Validation.isNumber(userId);
    if (result === false) {
      return response.status(400).json({
        status: 'failed',
        message: 'Id must be a number',
      });
    }
    db.query(findUserById(userId))
      .then((queryResult) => {
        if (result.rowCount === 0) {
          return response.status(404).json({ message: 'cannot find user with id' });
        }
        // Check if password is valid/Matched
        return response.status(200).json({
          status: 'success',
          message: 'User fetched successfully',
          data: queryResult.rows[0],

        });
      }).catch(err => err);
  }
}

export default AuthenticationController;
