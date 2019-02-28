import noteService from '../services/note-service.js';

export default {
    template: `
    <section v-if="note">
        <h2 class="keep-details-title" @click="editNote" v-bind:class="{ 'keep-hidden': isActive }">{{note.title}} </h2>
        <input type="text"  v-bind:class="{ alert: isTitleActive }" @input="addNewNote()" v-model="myTitle" placeholder="title">
        <div class="keep-details-txt">{{note.txt}}</div>
        <button @click="$router.push('/keep')" >back</button>
    </section>
    `,

    data(){
        return {
            note: null,
            isActive: false,
            
        }
    },

    methods: {
        editNote() {
            if (this.note) {
                var title = this.note.title;
                console.log(title);
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