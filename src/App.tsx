import React from 'react';
import { useState, useRef, useEffect } from 'react'
import COLORS from './colors.ts'
import { type NoteType } from './types.ts' // Import the child
import Note from './Note.tsx'
import './App.css'


function App() {

  //---------------------------------------------HEADER-------------------------------------------------- //

  //const colors = ['#ffd700', '#ff7eb9', '#7afbff', '#98ff98'];



  const [resizingNoteId, setResizingNoteId] = useState<string | null>(null);

  const [notes, setNotes] = useState<NoteType[]>(() => {
    const saved = localStorage.getItem('my-notes');
    return saved ? JSON.parse(saved) : [];
  });

  const [count, setCount] = useState<number>(() => {
    const cnt = localStorage.getItem('my-count');
    return cnt ? JSON.parse(cnt) : 0;
  });

  const [draggedNoteId, setDraggedNoteId] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const isDragging = useRef(false);


  // ---------------------------------------------FUNCTIONS-------------------------------------------- //

  useEffect(() => {
    // We turn the array into a string because localStorage only stores text
    localStorage.setItem('my-notes', JSON.stringify(notes));
    localStorage.setItem('my-count', JSON.stringify(count));
  }, [notes, count]);

  const clickTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined); // to capture click

  const ClickHandler = (e: React.MouseEvent<HTMLDivElement>) => {   // When you click, the browser creates a giant object full of 
    // data (which key was pressed, where the mouse was, etc.) and hands it to this function.

    if (isDragging.current) return; // click handler runs first and then timeout goes off and sets it to false

    clearTimeout(clickTimeout.current); // to clear prev clicks (1st one before 2nd one)

    clickTimeout.current = setTimeout(() => {
      setCount((prev: number) => prev + 1);

      setNotes(prev => {
        const newNote: NoteType = {
          id: Date.now().toString(),
          y: e.clientY,
          x: e.clientX, // represents x axis 
          z: prev.length + 1,
          color: COLORS[Math.floor(Math.random() * COLORS.length)],
          text: "",
          title: "Title",
          height: 150,
          width: 150
        };
        return [...prev, newNote]
      })
    }, 0);
    //...notes part says "Take everything currently inside the old notes array and dump it out here."
    // prev is not note but Array<Note> (Array of notes)
  }

  const deleteNote = (e: React.MouseEvent, idToDelete: string) => {
    setCount(prev => Math.max(0, prev - 1));

    e.preventDefault(); // to stop browser form doing defauld things like on right click
    e.stopPropagation(); // to stop the click from working further(adding a note)

    const filteredNotes = notes.filter(note => note.id !== idToDelete);

    setNotes(filteredNotes);

  }


  const moveNote = (e: React.MouseEvent) => {
    if (draggedNoteId === null) return;

    e.preventDefault();

    isDragging.current = true;

    setNotes(prevNote =>
      prevNote.map((note) => {
        if (note.id === draggedNoteId) {
          return {
            ...note,
            x: e.clientX - dragOffset.x, // returns x postion of mouse They update only when a mouse event occurs.
            y: e.clientY - dragOffset.y
          }
        }
        return note;
      })
    )

  }

  const resizeNote = (e: React.MouseEvent) => {
    if (resizingNoteId === null) return;

    e.preventDefault();
    isDragging.current = true;

    setNotes(prev => prev.map(note => {
      if (resizingNoteId === note.id) {
        return {
          ...note,
          width: Math.max(50, e.clientX - note.x + 25),
          height: Math.max(50, e.clientY - note.y + 25)
        };
      }

      return note;
    }
    ));
  }

  const backToFront = (id: string) => {
    // 1. Find the highest Z currently in the notes array
    const maxZ =
      notes.length > 0
        ? Math.max(...notes.map((n) => n.z || 0))
        : 0;

    // 2. Update the selected note
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, z: maxZ + 1 }
          : note
      )
    );
  };

  const updateNoteText = (id: string, newText: string) => {
    setNotes(prev => prev.map(note =>
      (note.id === id) ? { ...note, text: newText } : note
    ));
  };

  const updateNoteTitle = (id: string, newTitle: string) => {
    setNotes(prev => prev.map(note =>
      (note.id === id) ? { ...note, title: newTitle } : note
    ));
  };

  // --------------------------------------------- RETURN ------------------------------------------------- //


  return (
    <div
      className='click-count'
      onClick={ClickHandler}
      onMouseMove={(e) => {
        if (draggedNoteId !== null) moveNote(e);
        if (resizingNoteId !== null) resizeNote(e);
      }}
      onMouseUp={(e) => {
        e.stopPropagation();
        setDraggedNoteId(null);
        setResizingNoteId(null);

        setTimeout(() => {
          isDragging.current = false;
        }, 0);
      }}
    >
      <h1
        className='click-h1'
      >

        <button className="clear-btn" onClick={(e) => {
          e.stopPropagation();
          setNotes([]); //  The button was only clearing the 
          setCount(0); //localStorage but wasn't updating the React component's internal state variables
          localStorage.removeItem('my-notes');
          localStorage.removeItem('my-count');
        }}>
          {count}
        </button>
      </h1>

      {notes.map(
        (note) => (
          <Note
            key={note.id}
            note={note}
            onUpdateTitle={updateNoteTitle}
            onUpdateText={updateNoteText}
            onDelete={deleteNote}
            onDragStart={(e, note: NoteType) => {
              backToFront(note.id)
              e.stopPropagation();
              isDragging.current = false;
              setDraggedNoteId(note.id);
              setDragOffset({
                x: e.clientX - note.x,
                y: e.clientY - note.y,
              });
            }}
            onResizeStart={(e, note: NoteType) => {
              backToFront(note.id);
              e.stopPropagation();
              isDragging.current = false;
              setResizingNoteId(note.id);
            }

            }
          />
        )
      )}

    </div>
  )

}

export default App
