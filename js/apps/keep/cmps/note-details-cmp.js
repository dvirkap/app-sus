import noteService from '../services/note-service.js';

export default {
    template: `
    <section v-if="note" class="note-details-container">
        <form :style="{backgroundColor: note.colorVal}">
        <div class="keep-title-input" @click="editTitle" v-bind:class="{ 'keep-hidden': !isTitleInEditMode }">{{note.title}}</div>
        <input type="text" ref="titleInput" class="keep-title-input" v-model="myTitle" v-bind:class="{ 'keep-hidden': isTitleInEditMode }" @input="editNote()" placeholder="title">
        <div class="keep-textarea-input" @click="editTextArea" v-bind:class="{ 'keep-hidden': !isTextInEditMode }" placeholder="Add a few words...">{{note.txt}}</div>
        <textarea v-model="myText" v-bind:class="{ 'keep-hidden': isTextInEditMode }" @input="editNote()" placeholder="Add a few words..."></textarea>
        <img class="keep-new-note-img" v-bind:src="this.note.imageurl" /> 
        <iframe :class="{'keep-hidden' : !this.note.videourl}" class="keep-new-note-img" v-bind:src="'https://www.youtube.com/embed/' + this.note.videourl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        <div class="note-details-buttons">
        <button type="button" @click="isPinned()"><i class="fas fa-thumbtack"> Pin</i></button>
        <button type="button" @click="isDeleted()"><i class="fas fa-trash-alt"> Delete</i></button>
        <button type="button" @click="$router.push('/keep')" ><i class="far fa-save"> Save</i></button>
        </div>      
</form>
        
    </section>
    `,
    // "id": this.noteId,
    // "type": this.noteType,
    // "title": this.myTitle,
    // "txt": this.myText,
    // "dateCreated": Date.now(),
    // "img": this.imageurl,
    // "video": this.videourl,
    // "categories": [this.categories],
    // "listItems": [''],
    // "sound": "sound url from local storage",
    // "isPinned": false,
    // "isDeleted": false,
    // "color": this.colorVal
    data() {
        return {
            note: null,
            isActive: false,
            myTitle: null,
            myText: null,
            isTitleInEditMode: true,
            isTextInEditMode: true,
            deleteNote: false,
        }
    },

    methods: {
        isDeleted() {
            this.isDeleted = true;
            noteService.deleteNoteById(this.note.id)
            this.$router.push('/keep')
        },
        editTitle() {
            if (this.note) {
                this.myTitle = this.note.title;
                this.isTitleInEditMode = false;
            }
        },
        editTextArea() {
            if (this.note) {

                this.myText = this.note.txt;
                this.isTextInEditMode = false;
            }
        },
        isPinned() {
            if (this.note) {
                this.note.isPinned = 1;
                noteService.saveNotesById(this.note.id, this.note)
                console.log(this.note.isPinned);
            }
        },
        editNote() {
            console.log();
            if (this.myTitle) {
                this.note.title = this.myTitle;
            }
            if (this.myText) {
                this.note.txt = this.myText;
            }
            console.log(this.note.title);
            noteService.saveNotesById(this.note.id, this.note)
        }
    },

    created() {
        const noteId = this.$route.params.noteId;
        noteService.getNotesById(noteId)
            .then(note => this.note = note);
        console.log('Param from route:', this.$route.params.noteId);
    },
    beforeDestroy() {
        noteService.movePinnedNotesToTop()
    },
    computed: {
    },

}