
/**
 * @exports
 * @class AuthMiddleware
 */

class AuthMiddleWare {
  /**
 * validate Email
 * @staticmethod
 * @param  {object} request - Request object
 * @param {object} response - Response object
 * @param {function} next - middleware next (for error handling)
 */
  static validateEmail(request, response, next) {
    const { email } = request.body;

    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;

    if (!emailPattern.test(email.trim())) {
      return response.status(400).json({ message: 'Invalid email' });
    }
    next();

    return null;
  }


  /**
 * validate request signup
 * @staticmethod
 * @param  {object} request - Request object
 * @param {object} response - Response object
 * @param {function} next - middleware next (for error handling)
 *
 */
  static validateSignUpRequest(request, response, next) {
    const {
      firstname, lastname, username, password, email,
    } = request.body;

    if (firstname === undefined || lastname === undefined || password === undefined || username === undefined || email === undefined) {
      return response.status(400).json({
        status: 'failed',
        message: 'Please define all fields',
      });
    }
    if (firstname.trim() == '' || lastname.trim() == '' || password.trim() == '' || username.trim() == '' || email.trim() == '') {
      return response.status(400).json({
        status: 'failed',
        message: 'Please fill all fields',
      });
    }
    next();
  }

  /**
 * validate request login
 * @staticmethod
 * @param  {object} request - Request object
 * @param {object} response - Response object
 * @param {function} next - middleware next (for error handling)
 *
 */
  static validateLoginRequest(request, response, next) {

    const {
      username, password,
    } = request.body;

    if (password === undefined || username === undefined) {
      return response.status(400).json({
        status: 'failed',
        message: 'Please define all fields',
      });
    }
    if (password.trim() == '' || username.trim() == '') {
      return response.status(400).json({
        status: 'failed',
        message: 'Please fill all fields',
      });
    }
    next();
  }
}

export default AuthMiddleWare;
