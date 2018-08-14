import { Router } from 'express';
import EntryController from '../controllers/EntryController';
import VerifyToken from '../middlewares/VerifyToken';
import VerifyData from '../middlewares/VerifyData';

// instantiate AuthRoute
const entryRoute = Router();
entryRoute.post('/', VerifyToken.tokenVerification, VerifyData.entryRequest, EntryController.addNewEntry);
entryRoute.get('/count', VerifyToken.tokenVerification, EntryController.getAllEntryCount);
entryRoute.get('/:entryId', VerifyToken.tokenVerification, EntryController.fetchSingleEntry);
entryRoute.put('/:entryId', VerifyToken.tokenVerification, VerifyData.entryRequest, EntryController.updateEntries);
entryRoute.get('/', VerifyToken.tokenVerification, EntryController.fetchUserEntries);
// entryRoute.delete('/:entryId',VerifyToken.tokenVerification, EntryController.deleteEntry);
entryRoute.put('/archive/:entryId',VerifyToken.tokenVerification, EntryController.archiveEntry);
entryRoute.get('/today/count', VerifyToken.tokenVerification, EntryController.getTodayEntryCount);
entryRoute.get('/archive/count', VerifyToken.tokenVerification, EntryController.getArchiveEntryCount)




// entryRoute.get('/today', EntryController.getTodayEntries);
// entryRoute.get('/favourite', EntryController.getFavouriteEntry);
// entryRoute.get('/favourite/count', EntryController.getFavouriteEntryCount);

export default entryRoute;
