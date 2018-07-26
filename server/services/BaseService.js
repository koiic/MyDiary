class BaseService {
  static createdSuccessfully(message, data) {
    return {
      responseMessage: message,
      status: 201,
      data,
    };
  }


  static unauthenticated(message) {
    return {
      responseMessage: message,
      status: 401,
    };
  }

  static badRequest(message) {
    return {
      responseMessage: message,
      status: 400,
    };
  }

  static unauthorized(message) {
    return {
      responseMessage: message,
      status: 403,
    };
  }

  static notFound(message) {
    return {
      responseMessage: message,
      status: 404,
    };
  }

  static internalServerError(message) {
    return {
      responseMessage: message,
      status: 500,
    };
  }

  static success(message, data) {
    return {
      responseMessage: message,
      status: 200,
      data,
    };
  }

  static conflictError(message) {
    return {
      responseMessage: message,
      status: 409,
    };
  }

  static checkArgs(...params) {
    if (params.length < 2 || params.length > 4) {
      return this.badRequest('Please insert or pass the right arguments');
    }
    return null;
  }
}

export default BaseService;
