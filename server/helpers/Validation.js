class Validation {
  static isNumber(id) {
    // let error;
    const parsedId = parseInt(id, 10);
    if (!id || isNaN(parsedId) || typeof parsedId !== 'number') {
      return false;
    }

    return true;
  }

  static isEmail(email) {
    const emailPattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;

    if (!email || email.trim() === '', !emailPattern.test(email)) {
      return false;
    }
    return true;
  }

  static isString(value) {
    const specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
    if (!specialChar.test(value)) {
      return false;
    }
    return true;
  }

  static isPassword(password) {
    if (password.length < 4) {
      return false;
    }
    return true;
  }
}

export default Validation;
