let title = ['Einkaufen'];
let notes = ['Milch, Eier, Mehl'];

let trashTitle = [];
let trashNotes = [];



function init() {
    load();
    loadTrash();
    renderContent();
}


function renderContent() {
    let content = document.getElementById('content');
    content.innerHTML = '';
    content.innerHTML += innerHtml(); renderNewNotes();
}


function innerHtml() {
    return /* html */ `
    <div class="formDiv">
        <input id="inputTitle" placeholder="Titel...">
        <textarea id="inputNote" placeholder="Neues Notiz.." class="textArea"></textarea>
            <button onclick="addNotes()">
                Hinzufügen 
            </button>
         </div>
    <div id="notes-content" class="notes-content"></div>
    `;
}


/////Renders the new Note-Cards/Divs///////
function renderNewNotes() {
    for (i = 0; i < title.length; i++) {
        const myTitle = title[i];
        const myNotes = notes[i];

        document.getElementById('notes-content').innerHTML += newNotesHTML(myTitle, myNotes, i)
    }
}


function newNotesHTML(myTitle, myNotes, i) {
    return /* html */ `
    <div class="card-parent">
        <div class="card-child">
            <h3>${myTitle}</h3><br> 
            <a onclick="deleteNote(${i})" title="Notiz löschen"> 
                <img src="../img/x-mark-16.ico">
            </a>
        </div>
        <span class="span">${myNotes} <br></span>
    </div>
`;
}


////// add notes and proof Inputs /////
function addNotes() {
    let newTitle = document.getElementById('inputTitle');
    let newNote = document.getElementById('inputNote');

    if (!(newTitle.value.length == 0 || newNote.value.length == 0)) {
        title.push(newTitle.value);
        notes.push(newNote.value);

        renderContent();
        save();
        return;
    }
    else {
        proofInput(newTitle, newNote);
    }
}


function proofInput(newTitle, newNote) {
    if (newTitle.value.length == 0 && newNote.value.length == 0) {
        alert('Wie wäre es mit einem Titel und eine Notiz?');
        return;
    }

    if (newTitle.value.length == 0) {
        alert('Wie wäre es mit einem Titel?')
        return;
    }

    if (newNote.value.length == 0) {
        alert('Keine Notiz?');
        return;
    }
}



////Delete Notes and push Trash-Arrays////
function deleteNote(i) {
    trashTitle.push(title[i]);
    trashNotes.push(notes[i]);

    title.splice(i, 1);
    notes.splice(i, 1);

    renderContent();
    save();
    saveTrash();
}


///// Delete Note in Trash Bin /////
function deleteTrash(i) {
    trashTitle.splice(i, 1);
    trashNotes.splice(i, 1);

    renderTrashBin();
    save();
    saveTrash();
}


function reSaveNote(i) {
    title.push(trashTitle[i]);
    notes.push(trashNotes[i]);

    trashTitle.splice(i, 1);
    trashNotes.splice(i, 1);

    renderContent();
    renderTrashBin();
    save();
    saveTrash();
}


function save() {
    let titleAsText = JSON.stringify(title);
    let notesAsText = JSON.stringify(notes);

    localStorage.setItem('title', titleAsText)
    localStorage.setItem('notes', notesAsText)
}


function saveTrash() {
    let trashTitleAsText = JSON.stringify(trashTitle);
    let trashNotesAsText = JSON.stringify(trashNotes);

    localStorage.setItem('trashTitle', trashTitleAsText);
    localStorage.setItem('trashNotes', trashNotesAsText);
}


function load() {
    let titleAsText = localStorage.getItem('title');
    let notesAsText = localStorage.getItem('notes');

    if (titleAsText && notesAsText) {
        title = JSON.parse(titleAsText);
        notes = JSON.parse(notesAsText);
    }
}


function loadTrash() {
    let trashTitleAsText = localStorage.getItem('trashTitle')
    let trashNotesAsText = localStorage.getItem('trashNotes')

    if (trashTitleAsText && trashNotesAsText) {
        trashTitle = JSON.parse(trashTitleAsText);
        trashNotes = JSON.parse(trashNotesAsText);
    }
}


function renderTrashBin() {
    let displayTrash = document.getElementById('trash');
    displayTrash.innerHTML = '';

    if (trashTitle.length == 0) {
        closeTrashBin();
        return;
    }

    for (i = 0; i < trashTitle.length; i++) {
        const myTrashTitle = trashTitle[i];
        const myTrashNotes = trashNotes[i];

        displayTrash.innerHTML += trashBinHTML(myTrashTitle, myTrashNotes, i);
    }
}

function trashBinHTML(myTrashTitle, myTrashNotes, i) {
    return /* html */ `
    <div class="card-parent-trash">
        <div class="card-child">
            <h3>${myTrashTitle}</h3><br> 
             <a onclick="deleteTrash(${i})" title="Endgültig löschen.."> <img src="../img/x-mark-16.ico" ></a>
             <a onclick="reSaveNote(${i})" class="resave-logo"  title="Wiederherstellen"><img src="../img/sinchronize-24.ico"></a>
          </div>
    <span class="span">${myTrashNotes} <br></span>
</div>
`;
}


function openTrashBin() {
    document.getElementById('bg1').classList.remove('d-none');
}


function closeTrashBin() {
    document.getElementById('bg1').classList.add('d-none');
}
