import noteService from '../services/note-service.js';
import noteList from '../cmps/note-list-cmp.js';
import noteDetails from '../cmps/note-details-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js';
import noteAdd from '../cmps/note-add-cmp.js';

export default {
    template: `
        <section class="book-app">
            <div class="keep-app-header"></div>
            <note-list :notes="notesToShow"></note-list>
            
          
        </section> 
    `,
    data() {
        return {
            notes: [],
            
        }
    },
    
    created() {
      
    },
    methods: {
        

       
    },
    computed: {
        notesToShow(){

        }
       

    },
    components: {
        noteService,
        noteList,
        noteDetails,
        noteFilter,
        noteAdd
    }
}