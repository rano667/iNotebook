import React, { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);

  // get all Notes
  const getNotes = async () => {
    // Api call
    // --fetch with header(search) -- copy&paste
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    const json = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(json);
  };

  // Add a Note
  const addNote = async (title, description, tag) => {
    // Api call
    // --fetch with header(search) -- copy&paste
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    const note = await response.json(); // parses JSON response into native JavaScript objects
    setNotes(notes.concat(note));
  };

  //Delete Note
  const deleteNote = async (id) => {
    // Api call
    // --fetch with header(search) -- copy&paste
    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },
    });
    await response.json(); // parses JSON response into native JavaScript objects

    //deleting the note from Notes using filter and creating NewNotes
    const NewNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(NewNotes);
  };
  //Edit Note
  const editNote = async (id, title, description, tag) => {
    // Api call
    // --fetch with header(search) -- copy&paste
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.

      headers: {
        "Content-Type": "application/json",
        token: localStorage.getItem("token"),
      },

      body: JSON.stringify({ title, description, tag }), // body data type must match "Content-Type" header
    });
    await response.json(); // parses JSON response into native JavaScript objects

    // logic to edit in client
    let NewNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < NewNotes.length; index++) {
      const element = NewNotes[index];
      if (element._id === id) {
        NewNotes[index]._id = id;
        NewNotes[index].title = title;
        NewNotes[index].description = description;
        NewNotes[index].tag = tag;
        break;
      }
    }
    setNotes(NewNotes);
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
