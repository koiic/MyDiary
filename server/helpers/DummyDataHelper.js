class DummyDataHelpers {
  static validateEntry(body) {
    let error;
    if (!body.title || body.title === undefined || body.title.trim() === '') {
      error = 'title cannot be empty';
    }

    if (!body.note || body.note === undefined || body.note.trim() === '') {
      error = 'note cannot be empty';
    }
    return error;
  }

  static validateId(entryId) {
    // let error;
    const id = parseInt(entryId, 10);
    if (isNaN(id) || typeof id !== 'number') {
      return false;
    }

    return true;
  }


  static titleExists(dummydata, title) {
    for (let i = 1; i < dummydata.length; i++) {
      if (dummydata[i].title.trim().toLowerCase() === title.trim().toLowerCase()) {
        return true;
      }
    }
    return false;
  }


  static findById(dummyData, id) {
    for (let i = 0; i < dummyData.length; i += 1) {
      if (dummyData[i].id === id) {
        return dummyData[i];
      }
    }
    return null;
  }

  static updateEntry(data, dummyData, id) {
    const fetchData = this.findById(dummyData, id);
    if (fetchData) {
      fetchData.title = data.title;
      fetchData.note = data.note;
      fetchData.imageLink = data.imageLink;
      fetchData.updatedDate = data.updatedDate;
      fetchData.isFavourite = data.isFavourite;
      return fetchData;
    }
    return null;
  }

  static deleteEntry(dummyData, id) {
    const fetchData = this.findById(dummyData, id);
    if (fetchData) {
      dummyData.splice(dummyData.indexOf(fetchData), 1);
      return true;
    }
    return false;
  }

  static findCurrentDayEntry(dummyData) {
    const d = new Date();
    const formattedDate = d.toDateString;
    const todayEntry = [];

    for (let i = 0; i < dummyData.length; i++) {
      if (dummyData[i].createdDate.toDateString === formattedDate) {
        todayEntry.push(dummyData[i]);
      }
      return todayEntry;
    }
    return todayEntry;
  }

  static findCurrentDayEntryCount(dummyData) {
    const d = new Date();
    const formattedDate = d.toDateString;
    let count = 0;

    for (let i = 0; i < dummyData.length; i += 1) {
      if (dummyData[i].createdDate.toDateString === formattedDate) {
        count += 1;
      }
      return count;
    }
    return count;
  }


  static findEntryByDate(dummyData, creationDate) {
    const dateCreated = creationDate.toDateString;
    const todayEntry = [];

    for (let i = 0; i < dummyData.length; i += 1) {
      if (dummyData[i].createdDate.toDateString === dateCreated) {
        todayEntry.push(dummyData[i]);
      }
      return todayEntry;
    }
    return todayEntry;
  }

  static findEntryCountByDate(dummyData, creationDate) {
    const dateCreated = creationDate.toDateString;
    let count = 0;

    for (let i = 0; i < dummyData.length; i += 1) {
      if (dummyData[i].createdDate.toDateString === dateCreated) {
        count += 1;
      }
      return count;
    }
    return count;
  }

  static getFavEntries(dummyData) {
    const favEntry = [];
    dummyData.forEach((item) => {
      if (item.isFavourite === true) {
        favEntry.push(item);
        return favEntry;
      }
    });
    return favEntry;
  }


  static findFavouriteEntryCount(dummyData) {
    let count = 0;
    dummyData.forEach((item) => {
      if (item.isFavourite === true) {
        count += 1;
        return count;
      }
    });
    return count;
  }
}

export default DummyDataHelpers;
