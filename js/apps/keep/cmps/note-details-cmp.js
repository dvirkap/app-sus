import noteService from '../services/note-service.js';

export default {
    template: `
    <section v-if="note">
        <h2 class="keep-details-title">{{note.title}}</h2>
        <div class="keep-details-txt">{{note.txt}}</div>
        <button @click="$router.push('/keep')" >back</button>
    </section>
    `,

    data(){
        return {
            note: null,
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