import pool from "../db.js/pg.js";

export const addNote = async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO notes (title, content) VALUES ($1, $2) RETURNING *",
      [title, content]
    );
    return res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error adding note:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllNotes = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM notes");
    return res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error getting all notes:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getNoteById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT * FROM notes WHERE id = $1", [id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error getting note by id:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await pool.query("UPDATE notes SET title = $1, content = $2 WHERE id = $3 RETURNING *", [title, content, id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating note:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("DELETE FROM notes WHERE id = $1 RETURNING *", [id]);
    return res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error deleting note:", error.message);
    return res.status(500).json({ message: "Internal server error", error: error.message });
  }
};