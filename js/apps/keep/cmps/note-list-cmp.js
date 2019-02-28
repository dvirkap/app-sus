import noteService from '../services/note-service.js';
import notePreview from './note-preview-cmp.js';

export default {
    template: `
   
        <!-- <h2>User {{ $route.params.id }}</h2> -->
        
    <ul class="keep-list-container ">
        <li class="shadow-drop-2-center " :class="{'keep-add-note-container' : isAddNewNoteButtonVisibile}" :style="{backgroundColor: colorVal}" v-on:bgcolor="newcolor">
            <div :class="{'keep-hidden' : isRouterViewHidden}" >
                    <router-view></router-view>
            </div>
            <div :class="{'keep-hidden' : isAddNewNoteButtonVisibile}"  @click="addNewNote" >
                    <router-link to="/keep/noteadd">
                         <div class="keep-preview-title">Click to add Note</div>
                        <div class="keep-preview-txt">+</div>
                    </router-link>
                    </div>
        </li>

        <li v-for="(currNote, idx) in notes" :key="currNote.id">
            <router-link :to="'/keep/' + currNote.id">
                <note-preview :note="currNote" :idx="idx+1"></note-preview>
            </router-link>
        </li>
    </ul>
    
    `,

    data() {
        return {
            notes: [],
            isRouterViewHidden: true,
            isAddNewNoteButtonVisibile: false,
            isAddNoteActivated: true,
            colorVal:  null,



        }
    },
    methods: {
        newcolor(newBgColor) {
            this.colorVal = newBgColor;
            console.log('this.colorVal',this.colorVal )
        },
        addNewNote() {
            this.isRouterViewHidden = false;
            this.isAddNewNoteButtonVisibile = true;
        },
        
    },

    created() {
        noteService.getNotes()
            .then(notes => this.notes = notes)
    },

    computed: {

        
    },
    components: {
        notePreview
    }


}