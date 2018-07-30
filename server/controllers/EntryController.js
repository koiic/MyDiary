import dummyEntries from '../DummyData/dummyEntries';
import EntryService from '../services/EntryService';
import DummyDataHelpers from '../helpers/DummyDataHelper';

class EntryController {
  // create new entry
  static addNewEntry(request, response) {
    const {
      title, note, isFavourite,
    } = request.body;
    const result = EntryService.addEntry(request.body);
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }


  /**
   * get all entries
   * @param {} request
   * @param {*} response
   */
  static getAllEntries(request, response) {
    if (!dummyEntries || dummyEntries !== undefined) {
      return response.status(200).json({
        status: 'success',
        message: 'fetch all entries succesfully',
        data: dummyEntries,
      });
    }
    return response.status(404).json({
      status: 'Failed',
      message: 'No entries found',
    });
  }

  /**
   * get all entry count
   * @param  request
   * @param  response
   */
  static getAllEntryCount(request, response) {
    const result = EntryService.entryVolume(dummyEntries);
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }

  /**
   * get current day entry
   * 
   * @param  response
   */
  static getTodayEntries(request, response) {
    const result = EntryService.todaysEntry();
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }

  /**
   * get current day entry count
   * @param  request
   * @param  response
   */
  static getTodayEntryCount(request, response) {
    const result = EntryService.todaysEntryVolume();
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }

  /**
   * get entry by id
   * @param  id
   * @param  response
   */
  static getEntryById(request, response) {
    const { entryId } = request.params;
    const id = parseInt(entryId, 10);
    if (typeof id !== 'number' || isNaN(id)) {
      return response.status(400).json({
        status: 'Failed',
        message: 'id must be a number',
      });
    }
    const result = EntryService.fetchById(id);
    if (!result) {
      return response.status(404).json({
        status: 'Failed',
        message: `no entry for id ${id}`,
      });
    }
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }


  /**
   * Update Entry
   * @param  request
   * @param  response
   */
  static updateEntries(request, response) {
    const { entryId } = request.params;
    const id = parseInt(entryId, 10);
    if (typeof id !== 'number' || isNaN(id)) {
      return response.status(400).json({
        status: 'Failed',
        message: 'id must be a number',
      });
    }
    const result = EntryService.update(request.body, id);
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }


   /**
   * Delete entry by id 
   * @param  request
   * @param  response
   */
  static deleteEntry(request, response) {
    const { entryId } = request.params;
    const id = parseInt(entryId, 10);
    if (typeof id !== 'number' || isNaN(id) || id === '') {
      return response.status(400).json({
        status: 'Failed',
        message: 'id must be a number',
      });
    }
    const result = EntryService.deleteOne(id);
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }

  // fetch all favourite entry
  static getFavouriteEntry(request, response) {
    const result = EntryService.favouriteEntries();
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }

  // get volume of favourite entry
  static getFavouriteEntryCount(request, response) {
    const result = EntryService.favouriteEntriesCount();
    return response.status(result.status).json({
      message: result.responseMessage,
      data: result.responseData,
    });
  }
}

export default EntryController;
