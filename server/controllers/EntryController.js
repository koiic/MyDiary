import DummyDataHelpers from '../helpers/DummyDataHelper';
import dummyEntries from '../DummyData/dummyEntries';

class EntryController {
  static addNewEntry(request, response) {

    const {
      title, note, isFavourite
    } = request.body;

    console.log(`new request is :${request.body}`);

    // check if title exists
    const error = DummyDataHelpers.validateEntry(request.body);
    console.log(error);
    if (!error) {
      // const result = DummyDataHelpers.findByTitle(dummyEntries, request.body.title)
      // console.log(`result is : ${result}`);
      // if(result > 0){
      //   return response.status(409).json({
      //     status: 'failed',
      //     message: 'entry title exist',
      //   });
      // }

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
    return response.status(200).json({
      status: 'success',
      message: 'fetch all entries succesfully',
      data : dummyEntries
    })
    
  }
}

export default EntryController;
