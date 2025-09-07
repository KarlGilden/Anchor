import express from 'express';
import { entryController } from '../controllers/entryController';

const entryRouter = express.Router();

entryRouter.patch('/entry/:id', entryController.updateEntry);
entryRouter.delete('/entry/:id', entryController.deleteEntry);

export default entryRouter;