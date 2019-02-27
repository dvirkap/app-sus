import noteService from '../services/note-service.js';
import notePreview from './note-preview-cmp.js';

export default {
    template: `
    <section>
          <ul>
    <li 
        v-for="(currNote, idx) in notes" 
        :key="currNote.id"
    >
        <router-link
        :to="'/keep/' + currNote.id">
            <note-preview
            :note="currNote" :idx="idx+1"
            >
            </note-preview>
        </router-link>

    </li>
        </ul>
    </section>
    `,

    data() {
        return {
            notes: [],
        }
    },
    methods: {

    },

    created() {
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },
components: {
    notePreview
}


}