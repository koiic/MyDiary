import {
  checkTitle, createNewEntry, fetchEntries, updateEntriesTable,
} from '../model/queryHelper';
import db from '../model/connect';
import Validation from '../helpers/Validation';

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
    const userId = request.decoded.userId;
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
    const userId = request.decoded.userId;
    try {
      db.query(fetchEntries(userId))
        .then((result) => {
          if (result.rowCount > 0) {
            return response.status(200).json({
              status: true,
              message: 'fetch entries successfully',
              data: result.rows,
            });
          }
          return response.status(404).json({
            message: 'Entries not found',
          });
        });
    } catch (error) {
      return response.status(500).json({
        status: 'fail',
        message: 'Internal Server Error',
        data: error,
      });
    }
  }

  static updateEntries(request, response) {
    console.log(request.decoded);
    const userId  = request.decoded.userId;
    console.log(userId);
    const { entryId } = request.params;
    // const {
    //   title, note, isFavourite, imageUrl,
    // } = request.body;

    const result = Validation.isNumber(entryId);
    if (result === false) {
      return response.status(400).json({
        status: 'failed',
        message: 'Id must be a number',
      });
    }
    try {
      db.query(updateEntriesTable(entryId, userId, request.body))
        .then((queryResult) => {
          if (queryResult.rowCount > 0) {
            return response.status(200).json({
              status: 'success',
              message: `An entry with ${entryId} has been updated successfully`,
              data: queryResult.rows,
            });
          }
          return response.status(400).json({
            status: 'failed',
            message: `Cannot update entries for id : ${entryId}`,
          });
        });
    } catch (error) {
      return response.status(500).json({
        status: 'failed',
        message: 'internal server error',
      });
    }
  }
}
export default EntryController;
