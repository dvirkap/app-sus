import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js';
// import bookDetails from '../cmps/book-details-cmp.js'
// import bookAdd from '../pages/book-add-cmp.js';

export default {
    template: `
        <section class="email-app email-wrapper">
            <!--<router-link to="/about">Inbox</router-link>-->
            <h1>Email App</h1>
            <!--<book-add></book-add>-->

            <email-filter v-on:filtered="setFilter"></email-filter>
            <email-status v-bind:emails="emails"></email-status>
            <email-list v-bind:emails="emailsToShow"></email-list>

            <!--<book-details v-bind:book="selectedBook"></book-details>-->
        </section> 
    `,
    data() {
        return {
            emails: [],
            // // selectedBook: null,
            // // filter: null,
            filterBy: {
                text: '',
                type: ''
                // fromPrice: 0,
                // toPrice: Infinity
            }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails);
    },
    methods: {
        setFilter(filterBy) {
            console.log('EmailApp Got Filter: ', filterBy);
            this.filterBy = filterBy;
        },
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
        emailsToShow() {
            var emailsByText = this.emails.filter(email => {
                return email.subject.includes(this.filterBy.text) ||
                    email.body.includes(this.filterBy.text);
            });
            var res = [];
            if (this.filterBy.type === 'Read') {
                return emailsByText.filter(email => email.isRead);
            }
            if (this.filterBy.type === 'Unread') {
                return emailsByText.filter(email => !email.isRead);
            }
            return emailsByText;

            // if (!this.filterBy.text &&
            //     (this.filterBy.type === 'All' || is.filterBy.type === '')) {
            //     return this.emails;
            // }

        },
    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        // bookAdd
    }
}