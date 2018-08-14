import {
  checkTitle, createNewEntry, fetchEntries, updateEntriesTable, getSingleEntry,deleteSingleEntry,
  fetchEntriesCount,archiveSingleEntries,todaysEntriesCount, archiveEntryCount
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
    const { userId } = request.decoded;
    const {
      title, note, imageUrl,
    } = request.body;

    // check if title exist
    db.query(checkTitle(title, userId))
      .then((result) => {
        if (result.rowCount > 0) {
          return response.status(409).json({
            message: 'Title already exist, change title',
          });
        }

        db.query(createNewEntry(title, note, imageUrl, userId))
          .then((queryResult) => {
            if (queryResult.rowCount === 0) {
              return response.status(500).json({
                message: 'Internal Server Error',
              });
            }
            return response.status(201).json({
              message: 'A new Entry added sucessfully',
              status: 'successful',
              data: queryResult.row,
            });
          });
      })
      .catch(err => err);
  }

  static fetchUserEntries(request, response) {
    // get logged in user id
    const { userId } = request.decoded;
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
      })
      .catch(err => err);
  }


  static updateEntries(request, response) {
    const { userId } = request.decoded;
    const { entryId } = request.params;


    const result = Validation.isNumber(entryId);
    if (result === false) {
      return response.status(400).json({
        status: 'failed',
        message: 'Id must be a number',
      });
    }
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
      })
      .catch(err => err);
  }


  static fetchSingleEntry(request, response) {
    const { userId } = request.decoded;
    const { entryId } = request.params;

    const result = Validation.isNumber(entryId);
    if (result === false) {
      return response.status(400).json({
        status: 'failed',
        message: 'Id must be a number',
      });
    }
    db.query(getSingleEntry(userId, entryId))
      .then((entryResult) => {
        if (entryResult.rowCount > 0) {
          return response.status(200).json({
            status: 'success',
            message: `Entry for id : ${entryId} fetched successfully`,
            data: entryResult.rows,
          });
        }
        return response.status(404).json({
          message: `Entry not found for id : ${entryId}`,
        });
      })
      .catch(err => err);
  }
  // static deleteEntry(request, response){
  //   const { userId } = request.decoded;
  //   const { entryId } = request.params;
  //   const result = Validation.isNumber(entryId);
  //   if (result === false) {
  //     return response.status(400).json({
  //       status: 'failed',
  //       message: 'Id must be a number',
  //     });
  //   }
  //   db.query(deleteSingleEntry(entryId, userId))
  //   .then((result) =>{
  //     console.log(result);
  //     if(result.rowCount === 1){
  //       return response.status(200).json({
  //         status: 'success',
  //         message: `Entry for id : ${entryId} deleted successfully`,
  //         data: result.rows,
  //       });
  //     }else if(result.rowCount !== 1){
  //       return response.status(404).json({
  //           status: 'failed',
  //           message: `Entry for id ${entryId} not found`, 
  //       })
  //     }
  //     return response.status(500).json({
  //       status: 'failed',
  //       message: 'Internal server error',
  //     });

  //   }).catch(err => err);
  // }

  static getAllEntryCount(request,response) {
    console.log(request.decoded);
    const { userId } = request.decoded;
    db.query(fetchEntriesCount(userId))
    .then((result) =>{
      if(!result){
        return response.status(404).json({
          status : "not found",
          data: 0,
          message:"Noo entries for user"
        })
      }
      return response.status(200).json({
        status: 'success',
        message: `Entry Count for user fetched successfully`,
        data: result.rows,
      });
    })

  }

  static getTodayEntryCount(request, response){
    console.log('I entered here');
    const { userId } = request.decoded;
    db.query(todaysEntriesCount(userId))
    .then((result) =>{
      console.log(result);
      return response.status(200).json({
        status: 'success',
        message: `fetch today entry count successfully`,
        data: result.rows,
      })

    }).catch(err => err);
}

  static archiveEntry (request, response) {
    const { userId } = request.decoded;
    const { entryId } = request.params;
    const result = Validation.isNumber(entryId);
    if (result === false) {
      return response.status(400).json({
        status: 'failed',
        message: 'Id must be a number',
      });
    }
    db.query(archiveSingleEntries(entryId, userId))
    .then((result) =>{
      console.log(result);
      if(result.rowCount === 1){
        return response.status(200).json({
          status: 'success',
          message: `Entry for id : ${entryId} archived successfully`,
          data: result.rows,
        });
      }else if(result.rowCount !== 1){
        return response.status(404).json({
            status: 'failed',
            message: `Entry for id ${entryId} not found`, 
        })
      }
      return response.status(500).json({
        status: 'failed',
        message: 'Internal server error',
      });

    }).catch(err => err);
  }

  static getArchiveEntryCount(request, response){
    const { userId } = request.decoded;
    db.query(archiveEntryCount(userId))
    .then((result) =>{
      console.log(result);
      return response.status(200).json({
        status: 'success',
        message: `fetch archive entry count successfully`,
        data: result.rows,
      })

    }).catch(err => err);
}

  
}
export default EntryController;
