 import React, { useState, useEffect } from 'react';
 import axios from 'axios';
 import './App.css'; // Create an App.css for styling

 interface Note {
     id: number;
     title: string;
     content: string;
     created_at: string; // Or Date, depending on how you want to handle it
 }

 function App() {
     const [notes, setNotes] = useState<Note[]>([]);
     const [title, setTitle] = useState('');
     const [content, setContent] = useState('');
     const [editingNote, setEditingNote] = useState<Note | null>(null);

     const API_URL = 'http://localhost:8000/api/notes/';  // Your Django backend URL

     // Fetch notes
     useEffect(() => {
         fetchNotes();
     }, []);

     const fetchNotes = async () => {
         try {
             const response = await axios.get<Note[]>(API_URL);
             setNotes(response.data);
         } catch (error) {
             console.error('Error fetching notes:', error);
         }
     };

     // Create a new note
     const createNote = async () => {
         try {
             await axios.post(API_URL, { title, content });
             setTitle('');
             setContent('');
             fetchNotes();  // Refresh notes after creating
         } catch (error) {
             console.error('Error creating note:', error);
         }
     };

     // Update a note
     const updateNote = async () => {
         if (!editingNote) return;
         try {
             await axios.put(`${API_URL}${editingNote.id}/`, {
                 title,
                 content,
             });
             setTitle('');
             setContent('');
             setEditingNote(null);
             fetchNotes(); // Refresh
         } catch (error) {
             console.error('Error updating note:', error);
         }
     };

     // Delete a note
     const deleteNote = async (id: number) => {
         try {
             await axios.delete(`${API_URL}${id}/`);
             fetchNotes();  // Refresh
         } catch (error) {
             console.error('Error deleting note:', error);
         }
     };

     // Set values for editing
     const startEditing = (note: Note) => {
         setEditingNote(note);
         setTitle(note.title);
         setContent(note.content);
     };

     return (
         <div className="app-container">
             <h1>Note App</h1>
             <div className="form-container">
                 <input
                     type="text"
                     placeholder="Title"
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                 />
                 <textarea
                     placeholder="Content"
                     value={content}
                     onChange={(e) => setContent(e.target.value)}
                 />
                 {editingNote ? (
                     <button onClick={updateNote}>Update Note</button>
                 ) : (
                     <button onClick={createNote}>Create Note</button>
                 )}
             </div>
             <div className="note-list">
                 {notes.map((note) => (
                     <div key={note.id} className="note-card">
                         <h2>{note.title}</h2>
                         <p>{note.content}</p>
                         <p>Created at: {new Date(note.created_at).toLocaleString()}</p>
                         <div className="button-group">
                             <button onClick={() => startEditing(note)}>Edit</button>
                             <button onClick={() => deleteNote(note.id)}>Delete</button>
                         </div>
                     </div>
                 ))}
             </div>
         </div>
     );
 }

 export default App;
