import express from 'express';
import dotenv from 'dotenv';
import notesRoutes from './src/routes/notes.routes.js';
import pool, { connectDB } from "./src/db.js/pg.js";

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());

app.use('/notes', notesRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});


connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to PostgreSQL", error);
    process.exit(1);
  });