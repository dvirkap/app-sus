// import longText from './long-text-cmp.js';
// import modal from './modal-cmp.js';
import emailService from '../services/email-service.js';
// import reviewAdd from '../cmps/review-add-cmp.js';
// import reviewDisplay from '../cmps/review-display-cmp.js';

export default {
    // props: ['book'],
    template: `
        <section v-if="email" class="email-details flex email-wrapper">
            <h4>{{email.subject}}</h4>
            <h6>From: {{email.from}}</h6>
            <h6>To: {{email.to}}</h6>
            <h6>Cc: {{email.cc}}</h6>
            <h6>Sent at: {{fornatedDate}}</h6>
            <hr>
            <p>{{email.body}}</p>
            <hr>
            <button v-on:click="onDeleteEmail">Delete</button>
            <button v-on:click="onUnreadEmail">Make unread</button>
            <p><router-link to="/email">Back to Inbox</router-link></p>
        </section>
        <!--<modal v-if="book" v-show="isShowModal" v-on:close="onCloseModal">-->
            <!--<h6 slot="body">{{book.title}}</h6>
            <h6 slot="body">{{pageCount}}</h6>
            <h6 slot="body">{{publishedDate}}</h6>
            <h6 slot="body" v-bind:class="classObject">{{bookPrice}}</h6>
            <h6 slot="body">{{onSale}}</h6>-->

            <!--<long-text slot="body" v-bind:txt="book.description"></long-text>-->
            <!--<review-display slot="body" v-bind:reviews="book.reviews" v-on:delete="onDeleteReview"></review-display>-->
            <!--<review-add slot="body" v-on:reviewed="onSaveReview"></review-add>-->
        <!--</modal>-->
    `,
    data() {
        return {
            // isShowModal: false,
            email: null,
        }
    },
    methods: {
        // selectBook(book) {
        //     this.$emit('selected', book.id);
        // }
        onDeleteEmail() {
            emailService.deleteEmail(this.email)
                .then(() => {
                    console.log('Email was deleted');
                    this.$router.push('/email');
                });
        },
        onUnreadEmail() {
            this.email.isRead = false;
        }
        // onCloseModal() {
        //     // console.log('onCloseModal');
        //     this.isShowModal = false;
        //     this.$router.push('/books');
        // },
        // onDeleteReview(reviewId) {
        //     // console.log('deleteReview');
        //     // console.log(reviewId);
        //     bookService.deleteReview(this.book.id, reviewId)
        //         .then(() => {
        //             console.log('Review was deleted');
        //         });
        // },
        // onSaveReview(review) {
        //     // console.log('saveReview');
        //     // console.log(review);
        //     bookService.addReview(this.book.id, review)
        //         .then(() => {
        //             console.log('Review was added');
        //             this.onCloseModal();
        //         });
        // }
    },
    computed: {
        fornatedDate() {
            // var timestamp = 1301090400,
            var date = new Date(this.email.sentAt);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            if (month < 10) month = '0' + month;
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
        // pageCount() {
        //     if (this.book.pageCount > 500) return 'Long reading';
        //     if (this.book.pageCount > 200) return 'Decent Reading';
        //     if (this.book.pageCount < 100) return 'Light Reading';
        //     return 'Regular Reading';

        // },
        // publishedDate() {
        //     var date = new Date;
        //     var currYear = date.getFullYear();
        //     if (currYear - this.book.publishedDate > 10) return 'Veteran Book';
        //     if (currYear - this.book.publishedDate < 1) return 'New!';
        //     return 'Less than 10 years book';

        // },
        // bookPrice() {
        //     return `${this.book.listPrice.amount} ${this.book.listPrice.currencyCode}`;
        // },
        // onSale() {
        //     if (this.book.listPrice.isOnSale) return 'On sale!!!';
        // },
        // classObject() {
        //     return {
        //         'red-bg': this.book.listPrice.amount > 150,
        //         'green-bg': this.book.listPrice.amount < 20
        //     }
        // },
    },
    created() {
        const emailId = +this.$route.params.emailId;
        emailService.getEmailById(emailId)
            .then(email => {
                this.email = email
                this.email.isRead = true;
            });
    },
    updated() {
        // console.log('REFS:', this.$refs);
        // if (this.$refs.fullName !== undefined) {
        //     this.$refs.fullName.focus();
        // }
    },
    watch: {
        // book: function () {
        //     this.isShowModal = true;
        // }
    },

    components: {
        // longText,
        // modal,
        // reviewAdd,
        // reviewDisplay
    }
}