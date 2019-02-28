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
            <button v-on:click="onComposeClicked">Compose</button>
            <button v-on:click="onInboxClicked">Inbox</button>
            <button v-on:click="onSentClicked">Sent</button>
            <email-compose v-show="isCompose" v-on:close="onCloseCompose" v-on:send="onSendEmail"></email-compose>
            <email-filter v-on:filtered="setFilter"></email-filter>
            <email-status v-bind:emails="emails"></email-status>
            <email-list v-bind:emails="emailsToShow" v-on:delete="onDeleteEmail"></email-list>
        </section> 
    `,
    data() {
        return {
            emails: [],
            filterBy: {
                text: '',
                type: ''
            },
            isCompose: false,
            isInbox: true
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
            // console.log(emailObj);
            emailService.addEmail(emailObj)
                .then(() => {
                    console.log('Email was sent');
                    this.isCompose = false;
                    // this.$router.push('/email');
                });
        },
        onDeleteEmail(emailId) {
            console.log(emailId);
            emailService.deleteEmail(emailId)
                .then(() => {
                    console.log('Email was deleted');
                    // this.$router.push('/email');
                });
        },
        setFilter(filterBy) {
            // console.log('EmailApp Got Filter: ', filterBy);
            this.filterBy = filterBy;
        },
        onInboxClicked() {
            this.isInbox = true;
        },
        onSentClicked() {
            this.isInbox = false;
        }
    },
    computed: {
        emailsToShow() {
            // filter by text in subject and body
            var emailList = this.emails.filter(email => {
                return email.subject.includes(this.filterBy.text) ||
                    email.body.includes(this.filterBy.text);
            });
            // filter by Read emails
            if (this.filterBy.type === 'Read') {
                emailList = emailList.filter(email => email.isRead);
            }
            // filter by Unread emails
            if (this.filterBy.type === 'Unread') {
                emailList = emailList.filter(email => !email.isRead);
            }

            if (this.isInbox) { // filter by Inbox emails
                emailList = emailList.filter(email => email.to === 'nirfuchs@appsus.com');
            } else {// filter by Sent emails
                emailList = emailList.filter(email => email.from === 'nirfuchs@appsus.com');
            }

            return emailList;
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