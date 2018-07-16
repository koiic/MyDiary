class DummyDataHelpers {
  static validateEntry(body) {
    let error;
    if (!body.title || body.title === undefined || body.title.trim() === '') {
      error = 'title cannot be empty';
    }

    if (!body.note || body.note === undefined || body.note.trim() === '') {
      error = 'Note cannot be empty';
    }
    return error;
  }

  static titleExists(dummydata, title) {

    for(let i = 1; i < dummydata.length; i++){
      if(dummydata[i].title.trim().toLowerCase() === title.trim().toLowerCase()){
        return true;
      }
    }

    return false;
  }

  static findById(dummydata, id) {
    for (let i = 0; i < dummydata.length; i++) {
      if (parseInt(dummydata[i].id) == id) {
        return dummydata[i];
      }
    }
    return null;
  }
}

export default DummyDataHelpers;
