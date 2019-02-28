import noteService from '../services/note-service.js';
import notePreview from './note-preview-cmp.js';

export default {
    template: `
    <section>
        <h2>User {{ $route.params.id }}</h2>
        
        <ul class="keep-list-container ">
        <li class="shadow-drop-2-center keep-add-note-container" :class="{'keep-double-size' : isAddNewNoteButtonVisibile}">
            <div :class="{'keep-hidden' : isRouterViewVisible}" >
                    <router-view></router-view>
            </div>
                <router-link to="/keep/noteadd">
                <div :class="{'keep-hidden' : isAddNewNoteButtonVisibile}">
                <div class="keep-preview-title" @click="addNewNote">Click to add Note</div>
                <div class="keep-preview-txt">+</div>
</div>
                </router-link>
            </li>

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
            isRouterViewVisible: false,
            isAddNewNoteButtonVisibile: false,
            isAddNoteActivated: true,



        }
    },
    methods: {
        addNewNote() {
            this.isRouterViewVisible = false;
            this.isAddNewNoteButtonVisibile = true;
        }
    },

    created() {
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },
    components: {
        notePreview
    }


}