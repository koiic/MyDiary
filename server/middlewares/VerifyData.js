class VerifyData {
  static entryRequest(request, response, next) {
    const {
      title, note
    } = request.body;

    const specialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;

    const error = [];

    const requestUrl = request.route.methods;

    if (requestUrl.post) {
      if (!title || title.trim() === '' || typeof title !== 'string') {
        error.push('title cannot be empty');
      }

      if (specialChar.test(title)) {
        error.push('Invalid title');
      }

      if (!note || note.trim() === '' || typeof note !== 'string') {
        error.push('Invalid note');
      }
    }
    if (error.length === 0) {
      return next();
    }
    return response.status(400).json({
      status: 'failed',
      message: error,
    });
  }
}
export default VerifyData;
