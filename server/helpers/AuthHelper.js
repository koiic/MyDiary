class AuthHelper {
  static verifyRequest(request) {
    let error;
    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
    if (request.email !== undefined) {
      if (request.email.trim() === '' || !emailPattern.test(request.email.trim())) {
        error = 'Invalid email';
      }
    } else {
      error = 'Email can not be blank';
    }

    if (request.password !== undefined) {
      if (request.password.trim() === '' || request.password.trim().length < 4) {
        error = 'Password length cannot be lesser than 4';
      }
    } else {
      error = 'Invalid password';
    }
    return error;
  }
}

export default AuthHelper;
