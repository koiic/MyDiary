import jwt from 'jsonwebtoken';
import config from '../config/config';

class VerifyToken {
  static tokenVerification(request, response, next) {
    const token =  request.headers.authorization.split(' ')[1];
    if (!token || token.trim() === '') {
      return response.status(403).json({
        message: 'No token Provided',
      });
    }
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        return response.status(401).json({
          message: 'Fail to authenticate token',
        });
      }
      request.decoded = decoded;
      next();
    });
  }
}

export default VerifyToken;
// request.body.token || request.query.token || request.headers['x-access-token'] ||