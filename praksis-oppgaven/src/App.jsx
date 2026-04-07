import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for notater
  const [notes, setNotes] = useState(() => {
    // Hent lagrede notater fra localStorage
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [newNote, setNewNote] = useState('');
  const [selectedColor, setSelectedColor] = useState('#ffffff');


  // Lagre notater til localStorage når de endres
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Fargealternativer
  const colors = [
    '#ffffff', // Hvit
    '#ffeb3b', // Gul
    '#4caf50', // Grønn
    '#2196f3', // Blå
    '#ff9800', // Oransje
    '#f44336', // Rød
    '#9c27b0', // Lilla
  ];

  // Legg til nytt notat
  const addNote = () => {
    if (newNote.trim() !== '') {
      const note = {
        id: Date.now(),
        text: newNote,
        color: selectedColor,
        pinned: false,
        date: new Date().toLocaleDateString('no-NO')
      };
      setNotes([note, ...notes]);
      setNewNote('');
    }
  };

  // Slett notat
  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  // Fest/Løsne notat
  const togglePin = (id) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, pinned: !note.pinned } : note
    ));
  };

  // Endre farge på notat
  const changeColor = (id, color) => {
    setNotes(notes.map(note => 
      note.id === id ? { ...note, color: color } : note
    ));
  };

  // Sorter notater: pinned først
  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });



  
  return (
    <div className="App">
      <header className="app-header">
        <h1> Notatapp</h1>
        <p className="subtitle">For deg som vil huske hva du skal gjøre!</p>
      </header>

      <main>
        {/* Skjemafelt for nytt notat */}
        <div className="note-form">
          <textarea
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Skriv notatet ditt her..."
            rows="3"
          />
          
          <div className="form-controls">
            <div className="color-selector">
              <span>Velg farge: </span>
              {colors.map(color => (
                <button
                  key={color}
                  className={`color-dot ${selectedColor === color ? 'selected' : ''}`}
                  style={{ backgroundColor: color }}
                 onClick={() => setSelectedColor(color)}
                 
                />
              ))}
            </div>


            
            <button onClick={addNote} className="add-button">
               Legg til notat
            </button>

            <small>{newNote.length}/200 tegn</small>
           
          </div>
        </div>

        {/* Visning av notater */}
        <div className="notes-container">
          
          {notes.length === 0 ? (
            <p className="empty-state">
              Ingen notater enda. Legg til ditt første notat!
            </p>
          ) : (
            <div className="notes-grid">
              {sortedNotes.map(note => (
                <div
                  key={note.id}
                  className={`note-card ${note.pinned ? 'pinned' : ''}`}
                  style={{ backgroundColor: note.color }}
                >
                  <div className="note-header">
                    <span className="note-date">{note.date}</span>
                    <button
                      onClick={() => togglePin(note.id)}
                      className="pin-button"
               
                    >
                      {note.pinned ? '📌' : '📍'}
                    </button>
                  </div>
                  
                  <p className="note-text">{note.text}</p>
                  
                  <div className="note-footer">
                    <div className="note-actions">
                      <div className="color-options">
                        {colors.map(color => (
                          <button
                            
                            className="small-color-dot"
                            style={{ backgroundColor: color }}
                            onClick={() => changeColor(note.id, color)}
                          
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => deleteNote(note.id)}
                        className="delete-button"
                        title="Slett notat"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;