import noteService from '../services/note-service.js';

export default {
    template: `
    <section v-if="note">
        <div class="keep-title-input" @click="editTitle" v-bind:class="{ 'keep-hidden': !isTitleInEditMode }">{{note.title}}</div>
        <input type="text" class="keep-title-input" v-model="myTitle" v-bind:class="{ 'keep-hidden': isTitleInEditMode }" @input="addNewNote()" placeholder="title">
        <div class="keep-details-txt">{{note.txt}}</div>
        <button @click="$router.push('/keep')" >back</button>
    </section>
    `,

    data(){
        return {
            note: null,
            isActive: false,
            myTitle: null,
            isTitleInEditMode: true,
            
        }
    },

    methods: {
        editTitle() {
            if (this.note) {
                this.myTitle = this.note.title;
                this.isTitleInEditMode = false;
                // console.log(title);
            }
        }
    },

    created() {
        const noteId = this.$route.params.noteId;
        // noteService.getNotes()
        // .then(notes => this.notes = notes)
        noteService.getNotesById(noteId)
        .then(note => this.note = note);
        
        
        console.log('Param from route:', this.$route.params.noteId);
    }

}