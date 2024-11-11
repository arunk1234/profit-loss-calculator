let notes = [];

// Save a new note
function saveNote() {
    const noteInput = document.getElementById('note-input');
    const categoryInput = document.getElementById('category-input').value;
    const noteText = noteInput.value.trim();

    if (noteText === "") {
        alert("Please enter a note.");
        return;
    }

    // Create a new note object
    const newNote = {
        id: Date.now(),
        content: noteText,
        category: categoryInput
    };

    // Save the note to the notes array
    notes.push(newNote);
    displayNotes();

    // Clear the input field
    noteInput.value = '';
}

// Display all notes
function displayNotes() {
    const noteContainer = document.getElementById('note-container');
    noteContainer.innerHTML = ''; // Clear previous notes

    notes.forEach((note) => {
        const noteCard = document.createElement('div');
        noteCard.classList.add('note-card');

        noteCard.innerHTML = `
            <div class="note-category">${note.category}</div>
            <div class="note-content">${note.content}</div>
            <div class="note-actions">
                <button class="edit-btn" onclick="editNote(${note.id})">Edit</button>
                <button class="delete-btn" onclick="deleteNote(${note.id})">Delete</button>
            </div>
        `;

        noteContainer.appendChild(noteCard);
    });
}

// Delete a note
function deleteNote(noteId) {
    notes = notes.filter(note => note.id !== noteId);
    displayNotes();
}

// Edit a note
function editNote(noteId) {
    const noteToEdit = notes.find(note => note.id === noteId);
    document.getElementById('note-input').value = noteToEdit.content;
    document.getElementById('category-input').value = noteToEdit.category;

    // Remove the old note so that it can be re-saved
    deleteNote(noteId);
}
