import DummyDataHelpers from '../helpers/DummyDataHelper';
import dummyEntries from '../DummyData/dummyEntries';


class EntryService {
  static createdSuccessfully(message, data) {
    const httpStatus = 201;
    const response = {
      responseMessage: message,
      status: httpStatus,
      responseData: data,
    };
    return response;
  }


  static unauthenticated(message) {
    const httpStatus = 401;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static badRequest(message) {
    const httpStatus = 400;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static unauthorized(message) {
    const httpStatus = 403;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static notFound(message) {
    const httpStatus = 404;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static invalidData(message) {
    const httpStatus = 404;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static success(message, data) {
    const httpStatus = 200;
    const response = {
      responseMessage: message,
      status: httpStatus,
      responseData: data,
    };
    return response;
  }

  static conflictError(message) {
    const httpStatus = 409;
    const response = {
      responseMessage: message,
      status: httpStatus,
    };
    return response;
  }

  static checkArgs(...params) {
    if (params.length < 2 || params.length > 4) {
      return this.badRequest('Please insert or pass the right arguments');
    }
    return null;
  }

  // Method to add new entry to existing entries
  static addEntry(data) {
    if (!data || (typeof data) !== 'object') {
      return this.badRequest('the data pass are not right,pleas pass right data');
    }
    const error = DummyDataHelpers.validateEntry(data);
    if (!error) {
      if (DummyDataHelpers.titleExists(dummyEntries, data.title)) {
        return this.conflictError('title already exist,change title');
      }
      // const entryid = (dummyEntries.length - 1) + 1;
      const entryid = dummyEntries[dummyEntries.length - 1].id + 1;
      console.log(entryid);
      const newEntry = {
        id: entryid,
        title: data.title,
        note: data.note,
        imageUrl: data.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFavourite: data.isFavourite,
      };
      dummyEntries.push(newEntry);
      return this.createdSuccessfully('A new Entry created successfully', newEntry);
    }
    return this.badRequest(error);
  }

  // Method for finding an entry by Id
  static fetchById(id) {
    console.log(id);
    const result = DummyDataHelpers.findById(dummyEntries, id);
    
    console.log(`my result : ${result}`);
    if (!result) {
      return this.badRequest(`no entry for id ${id}`);
    }
    return this.success(`An entry with ${id} has been fetched successfully`, result);
  }

  // Method for getting the volume of entry
  static getEntryCount(dummydata) {
    return dummydata.length;
  }

  // method for modifying an entry
  static update(data, id) {
    this.checkArgs(data, id);
    if ((typeof data !== 'object')) {
      return this.invalidData('This request is invalid');
    }

    const entry = DummyDataHelpers.updateEntry(data, dummyEntries, id);
    console.log(entry);
    if (entry) {
      return this.success(`An entry with ${id} has been updated successfully`, entry);
    }
    return this.badRequest('Id does not exist');
  }

  // Method for deleting an entry
  static deleteOne(id) {
    if (DummyDataHelpers.deleteEntry(dummyEntries, id)) {
      return this.success(`An entry with ${id} has been deleted successfully`, true);
    }
    return this.notFound('Entries not available');
  }

  // Method for getting all entry volume
  static entryVolume() {
    const volumeOfEntry = dummyEntries.length;
    if (volumeOfEntry == null || volumeOfEntry === '') {
      return this.notFound('Entries not available');
    }
    return this.success('Entry volume successfully fetched', volumeOfEntry);
  }

  // Method to find entries for current day
  static todaysEntry() {
    const todayEntries = DummyDataHelpers.findCurrentDayEntry(dummyEntries);
    if (!todayEntries) {
      return this.notFound('No entry found for today');
    }
    return this.success('Todays entry fetched successfully', todayEntries);
  }

  // Method to find entry count/volume for current day
  static todaysEntryVolume() {
    const todayEntriesCount = DummyDataHelpers.findCurrentDayEntryCount(dummyEntries);
    if (!todayEntriesCount) {
      return this.notFound('No entry found for today');
    }
    return this.success('Todays Entry count fetched successfully', todayEntriesCount);
  }

  // Method to find daily entry
  static dailyEntry(createdDate) {
    const todayEntries = DummyDataHelpers.findEntryByDate(dummyEntries, createdDate);
    if (!todayEntries) {
      return this.notFound(`No entry found for ${createdDate}`);
    }
    return this.success(' entry fetched successfully', todayEntries);
  }

  // Method to find entry count/volume daily
  static dailyEntryVolume(createdDate) {
    {
      const todayEntriesCount = DummyDataHelpers.findEntryCountByDate(dummyEntries, createdDate);
      if (!todayEntriesCount) {
        return this.notFound(`No entry count found for ${createdDate}`);
      }
      return this.success('Todays Entry count fetched successfully', todayEntriesCount);
    }
  }

  // Method to fetch all favourites entries
  static favouriteEntries() {
    const favouriteEntries = DummyDataHelpers.getFavEntries(dummyEntries);
    if (!favouriteEntries || favouriteEntries === undefined) {
      return this.notFound('No Favourites Entries');
    }
    return this.success('Favourite entry fetched successfully', favouriteEntries);
  }

  // Method to find entry count/volume daily
  static favouriteEntriesCount() {
    {
      const favEntriesCount = DummyDataHelpers.findFavouriteEntryCount(dummyEntries);
      if (!favEntriesCount) {
        return this.notFound('No count');
      }
      return this.success('Favourite entry count fetched successfully', favEntriesCount);
    }
  }
}

export default EntryService;
