import noteService from '../services/note-service.js';
import noteList from '../cmps/note-list-cmp.js';
import noteDetails from '../cmps/note-details-cmp.js'
import noteFilter from '../cmps/note-filter-cmp.js';
import noteAdd from '../cmps/note-add-cmp.js';

export default {
    template: `
        <section class="book-app">
            <h1>Keep App</h1>
            <note-list :notes="notesToShow"></note-list>
            
            <!--<book-filter v-on:filtered="setFilter"></book-filter>-->
            <!--<book-list v-bind:books="booksToShow"></book-list>-->
            <!--<book-details v-bind:book="selectedBook"></book-details>-->
        </section> 
    `,
    data() {
        return {
            notes: [],
            
        }
    },
    
    created() {
        // noteService.getNotes()
        // .then(notes => this.notes = notes)
        

        // bookService.getBooks()
        //     .then(books => this.books = books);
    },
    methods: {
        

        // setFilter(filterBy) {
        //     console.log('BoookApp Got Filter: ', filterBy);
        //     this.filterBy = filterBy;
        // },
        // selectBook(bookId) {
        //     console.log(bookId);
        //     bookService.getBookById(bookId)
        //         .then(book => this.selectedBook = book);
        // },
    },
    computed: {
        notesToShow(){

        }
        // booksToShow() {
        //     if (!this.filterBy.title &&
        //         this.filterBy.fromPrice === 0 &&
        //         this.filterBy.toPrice === Infinity) return this.books;
        //     return this.books.filter(book => {
        //         return book.title.includes(this.filterBy.title) &&
        //             book.listPrice.amount > this.filterBy.fromPrice &&
        //             book.listPrice.amount < this.filterBy.toPrice
        //     })
        // },

    },
    components: {
        noteService,
        noteList,
        noteDetails,
        noteFilter,
        noteAdd
    }
}