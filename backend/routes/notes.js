const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//Route 1: Get all the notes using: GET "/api/notes/fetchallnotes". Login required.
router.get("/fetchallnotes", async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error");
  }
});

//Route 2: Add a new Note using: POST "/api/notes/addnote". Login required.
router.post(
  "/addnote",
  fetchUser,
  [
    //validating for empty notes
    body("title", "Enter an valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      //If there are errors return bad request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      //destructuring to get the details from the request Body
      const { title, description, tag } = req.body;
      //creating a new note
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      // save it to the db
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal Server Error");
    }
  }
);

//Route 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required.
router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    //destructuring to get the details from the request Body
    const { title, description, tag } = req.body;
    //creating a new note
    const newNote = {};
    if (title) {
      newNote.title = title;
    }
    if (description) {
      newNote.description = description;
    }
    if (tag) {
      newNote.tag = tag;
    }

    //find the note to be updated and update it
    let note = await Note.findById(req.params.id);
    //if doesn't exist
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //check note belongs to this user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndUpdate(
      req.params.id,
      { $set: newNote },
      { new: true }
    );
    res.json(note);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error");
  }
});
//Route 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required.
router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    //destructuring to get the details from the request Body
    const { title, description, tag } = req.body;

    //find the note to be deleted and delete it
    let note = await Note.findById(req.params.id);
    //if doesn't exist
    if (!note) {
      return res.status(404).send("Not Found");
    }
    //check note belongs to this user
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }
    note = await Note.findByIdAndDelete(req.params.id);
    res.json({ success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal Server Error");
  }
});

module.exports = router;
