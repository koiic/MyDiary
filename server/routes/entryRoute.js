import { Router } from 'express';
import EntryController from '../controllers/EntryController';

// instantiate AuthRoute
const entryRoute = Router();
entryRoute.post('/', EntryController.addNewEntry);
entryRoute.get('/', EntryController.getAllEntries);
entryRoute.get('/:entryId', EntryController.getEntryById);
export default entryRoute;
