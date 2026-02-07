import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get all subjects
router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM subjects ORDER BY subject_name");
    res.json(result.rows);
  } catch (error) {
    console.error("Subjects fetch error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Create a new subject
router.post("/", async (req, res) => {
  try {
    const { subject_name } = req.body;
    
    if (!subject_name || subject_name.trim() === "") {
      return res.status(400).json({ error: "Subject name is required" });
    }
    
    // Check if subject already exists
    const existingSubject = await pool.query(
      "SELECT * FROM subjects WHERE LOWER(subject_name) = LOWER($1)",
      [subject_name]
    );
    
    if (existingSubject.rows.length > 0) {
      return res.status(400).json({ error: "Subject already exists" });
    }
    
    const result = await pool.query(
      "INSERT INTO subjects (subject_name) VALUES ($1) RETURNING *",
      [subject_name]
    );
    
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Subject creation error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Get a single subject by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query("SELECT * FROM subjects WHERE id = $1", [id]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Subject not found" });
    }
    
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Subject fetch error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// Delete a subject by ID
router.delete("/:id", async (req, res) => {
  const client = await pool.connect();
  try {
    const { id } = req.params;
    
    // Start a transaction
    await client.query("BEGIN");
    
    // Check if subject exists
    const subjectCheck = await client.query("SELECT * FROM subjects WHERE id = $1", [id]);
    if (subjectCheck.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Subject not found" });
    }
    
    // Step 1: Get all questions for this subject
    const questionsResult = await client.query("SELECT id FROM questions WHERE subject_id = $1", [id]);
    const questionIds = questionsResult.rows.map(q => q.id);
    
    // Step 2: Delete all submissions related to these questions
    if (questionIds.length > 0) {
      const deleteSubmissionsResult = await client.query(
        "DELETE FROM submissions WHERE question_id = ANY($1)",
        [questionIds]
      );
      console.log(`Deleted ${deleteSubmissionsResult.rowCount} submissions`);
    }
    
    // Step 3: Delete all questions associated with this subject
    const deleteQuestionsResult = await client.query("DELETE FROM questions WHERE subject_id = $1", [id]);
    console.log(`Deleted ${deleteQuestionsResult.rowCount} questions for subject ${id}`);
    
    // Step 4: Delete all students associated with this subject
    const deleteStudentsResult = await client.query("DELETE FROM student WHERE subject_id = $1", [id]);
    console.log(`Deleted ${deleteStudentsResult.rowCount} students for subject ${id}`);
    
    // Step 5: Delete the subject
    const result = await client.query("DELETE FROM subjects WHERE id = $1 RETURNING *", [id]);
    
    // Commit the transaction
    await client.query("COMMIT");
    
    res.status(200).json({ message: "Subject and all related data deleted successfully", subject: result.rows[0] });
  } catch (error) {
    try {
      await client.query("ROLLBACK");
    } catch (rollbackError) {
      console.error("Rollback error:", rollbackError.message);
    }
    console.error("Subject deletion error:", error.message);
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

export default router;
