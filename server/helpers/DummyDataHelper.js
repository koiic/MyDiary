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

  static findByTitle(dummydata, title) {
    let result;
    dummydata.forEach(item => {
      console.log(item.title);
      if(item.title === title){
        result = 1
      }
      result = -1
    });
    return result;
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
