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

  static findById(dummyEntries, id) {
    for (let i = 0; i < dummyEntries.lenth; i + 1) {
      if (dummyEntries[i].id === id) {
        return true;
      }
    }
    return false;
  }
}

export default DummyDataHelpers;
