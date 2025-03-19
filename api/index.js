const admin = require("firebase-admin");
const cors = require("cors");
const express = require("express");
const port = 3000;

const app = express();

app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type"],
  credentials: true
}));
app.use(express.json());
var serviceAccount = require("./permissions.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://ytextension-500ff-default-rtdb.asia-southeast1.firebasedatabase.app"
});

const db = admin.firestore();

// Routes

// Fetch notes
app.get("/notes/:userId/:videoId", async (req, res) => {
  const { userId, videoId } = req.params;

  try {
    const docRef = db.collection("notes").doc(`${userId}_${videoId}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).json({ notes: [] });
    }

    const notesData = doc.data();
    res.status(200).json(notesData);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Error fetching notes");
  }
});

// Delete a note
app.delete("/notes/:userId/:videoId/:noteIndex", async (req, res) => {
  const { userId, videoId, noteIndex } = req.params;

  try {
    const docRef = db.collection("notes").doc(`${userId}_${videoId}`);
    const doc = await docRef.get();

    if (!doc.exists) {
      return res.status(404).send("No notes found");
    }

    const notesData = doc.data();
    const notes = notesData.notes;

    
    if (noteIndex < 0 || noteIndex >= notes.length) {
      return res.status(400).send("Invalid note index");
    }

    notes.splice(noteIndex, 1);
    await docRef.update({ notes });
    res.status(200).send("Note deleted successfully");
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Error deleting note");
  }
});

// Save a new note
app.post("/save-note", async (req, res) => {
  try {
    const { videoId, content, timestamp, userId } = req.body;

    if (!videoId || !content || !timestamp || !userId) {
      return res.status(400).send({ message: "Missing required fields" });
    }

    const noteId = `${userId}_${videoId}`;
    const noteRef = db.collection("notes").doc(noteId);

    const existingDoc = await noteRef.get();

    if (existingDoc.exists) {
      const existingData = existingDoc.data();
      const updatedNotes = [...existingData.notes, { content, timestamp }];
      await noteRef.update({ notes: updatedNotes });
    } else {
      await noteRef.set({
        userId,
        videoId,
        notes: [{ content, timestamp }],
      });
    }

    res.status(200).send({ message: "Note saved successfully" });
  } catch (error) {
    console.error("Error saving note:", error);
    res.status(500).send({ message: "Internal server error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
