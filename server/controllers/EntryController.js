import DummyDataHelpers from '../helpers/DummyDataHelper';
import dummyEntries from '../DummyData/dummyEntries';
import EntryService from '../services/EntryService';

class EntryController {

  //create new entry
  static addNewEntry(request, response) {

    const {
      title, note, isFavourite
    } = request.body;
    const result = EntryService.addEntry(request.body);
      return response.status(result.status).json({
        message: result.responseMessage,
        data: result.responseData,
      });  
   
  }


  //fetch all created entries
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

  // get volume of all saved entries
  static getAllEntryCount(request, response){
    const result = EntryService.entryVolume(dummyEntries);
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });
  }

  //fetch current day entry
  static getTodayEntries(request, response){
    const result = EntryService.todaysEntry();
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });

  }

  //get volume of current day entry
  static getTodayEntryCount(request, response){
    const result = EntryService.todaysEntryVolume();
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });
  }

  //Fetch single entry by its id
  static getEntryById(request, response){

    const { entryId } = request.params;
    
    const result = EntryService.findById(entryId);
    if(!result|| result == null){
      return response.status(404).json({
        status: 'Failed',
        message: `no entry for id ${entryId}`
      })
    }
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });
  }

  

  // modify an entry and update an entry
  static updateEntries(request, response){

    const {entryId} = request.params;
    const id = parseInt(entryId);
    if(typeof id !== 'number' || isNaN(id)){
      return response.status(400).json({
        status:'Failed',
        message:'Id must be a number'
      })
    }
    const result = EntryService.update(request.body, id);
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });

  }

  //delete one entry by its id
  static deleteEntry(request, response){
    const {entryId} = request.params;
    const id = parseInt(entryId);
    if(typeof id !== 'number' || isNaN(id)){
      return response.status(400).json({
        status:'Failed',
        message:'Id must be a number'
      })
    }
    const result = EntryService.deleteOne(id);
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });
  }

  // fetch all favourite entry
  static getFavouriteEntry(request, response){
    const result = EntryService.favouriteEntries();
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });

  }

   // get volume of favourite entry
   static getFavouriteEntryCount(request, response){
    const result = EntryService.favouriteEntriesCount();
    return response.status(result.status).json({
      message:result.responseMessage,
      data: result.responseData
    });

  }

  // static getDailyEntries(request, response){
  //   const { createdDate } = request.params;
  //   console.log(createdDate);

  //   const result = EntryService.dailyEntry(createdDate);
  //   return response.status(result.status).json({
  //     message:result.responseMessage,
  //     data: result.responseData
  //   });
  // }

  


}

export default EntryController;
