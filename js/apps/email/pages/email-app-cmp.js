import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';

// import bookDetails from '../cmps/book-details-cmp.js'
// import bookFilter from '../cmps/book-filter-cmp.js';
// import bookAdd from '../pages/book-add-cmp.js';

export default {
    template: `
        <section class="email-app email-wrapper">
            <!--<router-link to="/about">Inbox</router-link>-->
            <h1>Email App</h1>
            <!--<book-add></book-add>-->
            <!--<book-filter v-on:filtered="setFilter"></book-filter>-->
            
            <email-status v-bind:emails="emailsToShow"></email-status>
            <email-list v-bind:emails="emailsToShow"></email-list>

            <!--<book-details v-bind:book="selectedBook"></book-details>-->
        </section> 
    `,
    data() {
        return {
            emails: [],
            // // selectedBook: null,
            // // filter: null,
            // filterBy: {
            //     title: '',
            //     fromPrice: 0,
            //     toPrice: Infinity
            // }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails);
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
        unreadEmails() {
            var unReadEmails = this.emails.filter((email=> !email.isRead));
            return unReadEmails.length;
        },
        emailsToShow() {
            return this.emails;
            // if (!this.filterBy.title &&
            //     this.filterBy.fromPrice === 0 &&
            //     this.filterBy.toPrice === Infinity) return this.books;
            // return this.books.filter(book => {
            //     return book.title.includes(this.filterBy.title) &&
            //         book.listPrice.amount > this.filterBy.fromPrice &&
            //         book.listPrice.amount < this.filterBy.toPrice
            // })
        },

    },
    components: {
        emailList,
        emailStatus,
        // bookFilter,
        // bookAdd
    }
}