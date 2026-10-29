import express from 'express';
import { addNote, deleteNote, getAllNotes, getNoteById, updateNote } from '../controllers/notes.controller.js';
const router = express.Router();

router.post('/addNote', addNote);
router.get('/getAllNotes', getAllNotes);
router.get('/getNoteById/:id', getNoteById);
router.put('/updateNote/:id', updateNote);
router.delete('/deleteNote/:id', deleteNote);

export default router;