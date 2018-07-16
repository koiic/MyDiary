import { Router } from 'express';
import EntryController from '../controllers/EntryController';

// instantiate AuthRoute
const entryRoute = Router();
entryRoute.post('/', EntryController.addNewEntry);
entryRoute.get('/', EntryController.getAllEntries);
export default entryRoute;
