import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailCompose from '../cmps/email-compose-cmp.js';

// import bookDetails from '../cmps/book-details-cmp.js'
// import bookAdd from '../pages/book-add-cmp.js';

export default {
    template: `
        <section class="email-app email-wrapper">
            <!--<router-link to="/about">Inbox</router-link>-->
            <h1>Email App</h1>
            <!--<book-add></book-add>-->
            <button v-on:click="onComposeClicked">Compose</button>
            <email-compose v-show="isCompose" v-on:close="onCloseCompose" v-on:send="onSendEmail"></email-compose>
            <email-filter v-on:filtered="setFilter"></email-filter>
            <email-status v-bind:emails="emails"></email-status>
            <email-list v-bind:emails="emailsToShow"></email-list>

            <!--<book-details v-bind:book="selectedBook"></book-details>-->
        </section> 
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                text: '',
                type: ''
            },
            isCompose: false
        }
    },
    methods: {
        onComposeClicked() {
            // console.log('Compose new email');
            this.isCompose = true;
        },
        onCloseCompose() {
            this.isCompose = false;
        },
        onSendEmail(emailObj) {
            console.log(emailObj);
            emailService.addEmail(emailObj)
                .then(() => {
                    console.log('Email was sent');
                    this.isCompose = false;
                    // this.$router.push('/email');
                });
        },
        setFilter(filterBy) {
            console.log('EmailApp Got Filter: ', filterBy);
            this.filterBy = filterBy;
        },
    },
    computed: {
        emailsToShow() {
            var emailsByText = this.emails.filter(email => {
                return email.subject.includes(this.filterBy.text) ||
                    email.body.includes(this.filterBy.text);
            });
            if (this.filterBy.type === 'Read') {
                return emailsByText.filter(email => email.isRead);
            }
            if (this.filterBy.type === 'Unread') {
                return emailsByText.filter(email => !email.isRead);
            }
            return emailsByText;
        },
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails);
    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        emailCompose
    }
}