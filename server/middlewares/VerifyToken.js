import jwt from 'jsonwebtoken';
import config from '../config/config';

class VerifyToken {
  static tokenVerification(request, response, next) {
    const token = request.headers.authorization;
    if (!token || token.trim() === '') {
      return response.status(403).json({
        message: 'No token Provided',
      });
    }
    const verifiedToken = token.split(' ')[1];
    jwt.verify(verifiedToken, config.jwtSecret, (err, decoded) => {
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
