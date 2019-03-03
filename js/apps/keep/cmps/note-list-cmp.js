import noteService from '../services/note-service.js';
import notePreview from './note-preview-cmp.js';
import { eventBus, NEW_NOTE_CREATED } from '../../services/eventbus-service.js';

export default {
    template: `
   
        <!-- <h2>User {{ $route.params.id }}</h2> -->
        
    <ul class="keep-list-container ">
        <li  class="shadow-drop-2-center " ref="liNewNote" :class="{'keep-expand-note-container' : isAddNewNoteButtonVisibile}" :style="{backgroundColor: colorVal}" v-on:bgcolor="newcolor">
            <div id="newNote"  ref="note" :class="{'keep-hidden' : isRouterViewHidden}" @click="outsideTheBox">
                    <router-view></router-view>
                </div>
                <div ref="addNewNoteButton" :class="{'keep-hidden' : isAddNewNoteButtonVisibile}"  @click="addNewNote" >
                    <router-link to="/keep/noteadd">
                    <div class="keep-preview-title">Click to add Note</div>
                    <div class="keep-preview-txt">+</div>
                </router-link>
            </div>
        </li>
        
        <router-view name="editnote"></router-view>
        <li v-for="(currNote, idx) in notes" :key="currNote.id" @click="editNote" :class="{'keep-edit-note-container' : isEditNoteVisible}" >

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
            isEditNoteVisible: false,



        }
    },
    methods: {
        outsideTheBox() {
            console.log('note ref', this.$refs.note.id);
            
        },
        
        editNote() {
            this.isEditNoteVisible = true;
            // debugger;
            // router.push({ name: 'editnote'})
        },
        
        // params: { userId: 123 }
//             var el = document.getElementById("outside");
       
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
            .then(notes => this.notes = notes),
            this.notes.filter(note => {
                note.isDeleted === false;
                console.log(note);
                
            }),
            function() {
                window.addEventListener('mousedown',this.listenToClick);
            }
            
        
            
    },
    destroyed: function () {
        window.removeEventListener('mousedown',this.listenToClick)
        console.log(window.removeEventListener('mousedown',this.listenToClick));
        
      },

    computed: {
        // function() {
        //     newthis.notes.filter(note => {
        //         console.log(note);
        //      return   note.isDeleted === false;
                
        //     })
        // }
        
    },
    components: {
        notePreview
    },

    mounted() {
        // this.$nextTick(()=> {
        //     console.log()
        //   }),
          
          eventBus.$on(NEW_NOTE_CREATED, newNote => {
              if(this.isRouterViewHidden === false) {
                  this.isRouterViewHidden = true;
              }
              if(this.isAddNewNoteButtonVisibile === true) {
                  this.isAddNewNoteButtonVisibile = false;
              }
              
              console.log('note ref after mounted:', this.$refs.note.classList.toggle('keep-hidden'));
              console.log('note ref after mounted:', this.$refs.liNewNote.classList.toggle('keep-expand-note-container'));
              console.log('note ref after mounted:', this.$refs.addNewNoteButton.classList.toggle('keep-hidden'));
              console.log('new note:', newNote);
              noteService.getNotes()
              .then(notes => this.notes = notes)
        })
        
        
    },
    
    watch: {

    },
    


}