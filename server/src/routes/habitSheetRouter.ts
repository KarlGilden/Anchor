import express from 'express';

const habitSheetRouter = express.Router();

// habit sheets
habitSheetRouter.get('/', ()=>{});
habitSheetRouter.get('/:id', ()=>{});
habitSheetRouter.post('/', ()=>{});
habitSheetRouter.patch('/:id', ()=>{});
habitSheetRouter.delete('/:id', ()=>{});

// habits
habitSheetRouter.get('/:id/habit', ()=>{});
habitSheetRouter.post('/:id/habit', ()=>{});

export default habitSheetRouter;