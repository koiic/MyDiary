class AuthHelper {
  static verifyRequest(request) {
    
    const error = {};

    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;

    if (request.email !== undefined) {
      if (request.email.trim() === '' || !emailPattern.test(request.email.trim())) {
        error.email = 'Invalid email';
      }
    } else {
      error.blankEmail = 'Email cannot be blank';
    }

    if (request.password !== undefined) {
      if (request.password.trim() === '' || request.password.trim().length < 4) {
        error.password = 'Password length cannot be lesser than 4';
      }
    } else {
      error.blankPassword = 'Invalid password';
    }

    if (request.username !== undefined) {
      if (request.username.trim() === '') {
        error.username = 'Invalid username';
      }
    } else {
      error.blankUsername = 'Username cannot be blank';
    }

    if (request.firstname !== undefined) {
      if (request.firstname.trim() === '') {
        error.firstname = 'first name is invalid';
      }
    } else {
      error.blankFirstname = 'firstname cannot be blank';
    }

    return error;
  }
}

export default AuthHelper;

