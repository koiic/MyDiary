import {
  checkTitle, createNewEntry,fetchEntries
} from '../model/queryHelper';
import db from '../model/connect';

/**
 * Class to execute all entry functions
 */

class EntryController {
  /**
     * method to add a new entry
     * @param {object} request
     * @param {object} response
     */
  static addNewEntry(request, response) {
    // get logged in user id
    const userId = request.decoded.id;
    const {
      title, note, isFavourite, imageUrl,
    } = request.body;
    // check if title exist
    try {
      db.query(checkTitle(title, userId))
        .then((result) => {
          if (result.rowCount > 0) {
            return response.status(409).json({
              message: 'Title already exist, change title',
            });
          }
          db.query(createNewEntry(title, note, imageUrl, isFavourite, userId))
            .then((queryResult) => {
              if (queryResult.rowCount === 0) {
                return response.status(500).json({
                  message: 'Internal Server Error',
                });
              }
              return response.status(201).json({
                message: 'A new Entry added sucessfully',
                status: 'successful',
              });
            });
        });
    } catch (error) {
      return response.status(500).json({
        message: error,
      });
    }
  }

  static fetchUserEntries(request, response) {
    // get logged in user id
    const userId = request.decoded.id;    
    try {
      db.query(fetchEntries(userId))
        .then((result) => {
          if (result.rowCount > 0) {
            return response.status(200).json({
              status: true,
              message: 'fetch entries successfuly',
              data: result.rows,
            });
          }
          return response.status(200).json({
            status: true,
            message: 'No entries for user',
            data: result.body,
          });
        });
    }
    catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
        data: error,
      });
    }
  }
}
export default EntryController;
