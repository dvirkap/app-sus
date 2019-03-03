import rndWords from './rnd-word-service.js'
import createNoteId from '../../services/utils-service.js'
import storage from '../../services/storage-service.js'
export default {
    getNotes,
    getNotesById,
    addNote,
    saveNotesById,
    movePinnedNotesToTop,
    deleteNoteById
}
const NOTES_KEY = 'notes';
var numberOfNotes = 10;
var gNotes = [];

createDummyNotes(numberOfNotes)

function createDummyNotes(number) {
    var CheckNotesArrLength = storage.load(NOTES_KEY)
    console.log();

    if (!CheckNotesArrLength || CheckNotesArrLength.length === 0) {
        for (let i = 0; i < number; i++) {
            gNotes.push({
                "id": createNoteId.makeId(8),
                "type": "txt",
                "title": rndWords.words(3).join(' '),
                "txt": rndWords.words(20).join(' '),
                "dateCreated": Date.now(),
                "img": "https://picsum.photos/200/300/?random",
                "video": "video url",
                "categories": [rndWords.words(1).join(' '), rndWords.words(1).join(' ')],
                "listItems": [rndWords.words(5).join(' '), rndWords.words(5).join(' '), rndWords.words(5).join(' ')],
                "sound": "sound url from local storage",
                "isPinned": -1,
                "isDeleted": false,
                "color": "#"+((1<<24)*Math.random()|0).toString(16)

            })
        }
        console.log('After push:', gNotes);

        saveToStorage()
    } else return
}


function addNote(noteObj) {
    var note = noteObj;
    note.id = createNoteId.makeId(8);
    console.log('new note.id:', note.id);
    
    gNotes.push(note);
    storage.store(NOTES_KEY, gNotes);
    return Promise.resolve(note);
}

function saveToStorage() {
    storage.store(NOTES_KEY, gNotes)
    console.log('gNotes.length:', gNotes.length);
    console.log('area empty');
}


function getNotes() {
    // var randomWords = require('random-words');
    
    console.log('rnd:', rndWords.words(3).join(' '));
    gNotes = storage.load(NOTES_KEY)
    console.log('Check gNotes before Promise:', gNotes);
    return Promise.resolve(gNotes)
}

function getNotesById(CurrNoteId) {
    gNotes = storage.load(NOTES_KEY);
    var currNote = gNotes.find(note => {
        return CurrNoteId === note.id

    })
    return Promise.resolve(currNote);

}

function saveNotesById(CurrNoteId, note) {
    gNotes = storage.load(NOTES_KEY);
    var prevNoteIdx = gNotes.findIndex(note => {
        return CurrNoteId === note.id})
    console.log('prev:', prevNoteIdx);
        gNotes.splice(prevNoteIdx, 1, note)
    storage.store(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}
function deleteNoteById(CurrNoteId) {
    gNotes = storage.load(NOTES_KEY);
    var deleteNoteIdx = gNotes.findIndex(note => {
        return CurrNoteId === note.id})
        gNotes.splice(deleteNoteIdx, 1)
    storage.store(NOTES_KEY, gNotes);
    return Promise.resolve('deleted');
}

function movePinnedNotesToTop() {
    gNotes = storage.load(NOTES_KEY);
    gNotes.sort((a, b) => a - b)
       
            console.log('new arrayyyyyy :', gNotes);
            
       
    
    storage.store(NOTES_KEY, gNotes);
    return Promise.resolve(gNotes);
}


