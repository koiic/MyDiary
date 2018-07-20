import { Router } from 'express';
import EntryController from '../controllers/EntryController';

// instantiate AuthRoute
const entryRoute = Router();
entryRoute.post('/', EntryController.addNewEntry);
entryRoute.put('/:entryId', EntryController.updateEntries);
entryRoute.get('/', EntryController.getAllEntries);
entryRoute.get('/today', EntryController.getTodayEntries);
entryRoute.get('/count', EntryController.getAllEntryCount);
entryRoute.get('/today/count', EntryController.getTodayEntryCount);
entryRoute.get('/favourite', EntryController.getFavouriteEntry);
entryRoute.get('/favourite/count', EntryController.getFavouriteEntryCount);
entryRoute.delete('/:entryId', EntryController.deleteEntry);
entryRoute.get('/:entryId', EntryController.getEntryById);

export default entryRoute;
