import DummyDataHelpers from '../helpers/DummyDataHelper';
import dummyEntries from '../DummyData/dummyEntries';

class EntryController {
  static addNewEntry(request, response) {

    const {
      title, note, isFavourite
    } = request.body;

    // check if title exists
    const error = DummyDataHelpers.validateEntry(request.body);
    if (!error) {
     if(DummyDataHelpers.titleExists(dummyEntries, request.body.title)){
       return response.status(409).json({
        status: 'failed',
        message: 'entry title exist',
      });
     }
      const entryid = dummyEntries.length - 1 + 1;
      const newEntry = {
        id: entryid,
        title: request.body.title,
        note: request.body.note,
        imageUrl: request.body.imageUrl,
        createdAt: new Date(),
        updatedAt: new Date(),
        isFavourite: request.body.isFavourite,
      };

      dummyEntries.push(newEntry);
      return response.status(201).json({
        status: 'successful',
        message: 'entry creation successful',
        data: newEntry,
      });
    }
    return response.status(400).json({
      status: 'failed',
      message: error,
    });
  }

  static getAllEntries(request,response){
    if(!dummyEntries || dummyEntries !== undefined){
      return response.status(200).json({
        status: 'success',
        message: 'fetch all entries succesfully',
        data : dummyEntries
      })
    }
    return response.status(404).json({
      status: 'Failed',
      message: 'No entries found'
    })
    
  }

  static getEntryById(request, response){

    const { entryId } = request.params;
    const id = parseInt(entryId);
    if(typeof id !== 'number' || isNaN(id)){
      return response.status(400).json({
        status:'Failed',
        message:'Id must be a number'
      })
    }
    const fetchedEntry = DummyDataHelpers.findById(dummyEntries, id);
    if(!fetchedEntry|| fetchedEntry == null){
      return response.status(404).json({
        status: 'Failed',
        message: `no entry for id ${entryId}`
      })
    }
    return response.status(200).json({
      status: 'success',
      message: 'fetch entry succesfully',
      data : fetchedEntry
    })

    
  }
}

export default EntryController;
