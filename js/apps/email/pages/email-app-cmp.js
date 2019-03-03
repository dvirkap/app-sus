import emailService from '../services/email-service.js';
import emailList from '../cmps/email-list-cmp.js';
import emailStatus from '../cmps/email-status-cmp.js';
import emailFilter from '../cmps/email-filter-cmp.js';
import emailSort from '../cmps/email-sort-cmp.js';
import emailCompose from '../cmps/email-compose-cmp.js';
import userMsg from '../cmps/user-msg-cmp.js';
import { eventBus, SEND_EMAIL, DETAILS_CLOSED } from '../../services/eventbus-service.js';

export default {
    template: `
        <section class="email-app-container flex email-wrapper">
            <header class="email-app-header flex">
                <button href="javascript:void(0);" class="icon" v-on:click="onToggleNav()">
                    <i class="fa fa-bars"></i>
                </button>
                <!-- <h3 class="email-app-header-item">Appsus Email</h3> -->
                <email-filter class="email-app-header-item" v-on:filtered="setFilter"></email-filter>
                <email-sort class="email-app-header-item" v-bind:emails="emails"></email-sort>
            </header>
            <div class="email-app-content-container flex">
                <nav v-show="isShowNav" class="email-app-nav flex">
                <!-- <button v-on:click="onComposeClicked">Compose</button> -->
                <!-- <router-link class="font-bold" to="/email/compose" v-on:click.native="onComposeClicked">Compose</router-link> -->
                    <button class="email-app-nav-item font-bold" v-on:click="onComposeClicked">Compose</button>
                    <button class="email-app-nav-item" v-bind:class="classObjectInbox" v-on:click="onInboxClicked">Inbox</button>
                    <button class="email-app-nav-item" v-bind:class="classObjectSent" v-on:click="onSentClicked">Sent</button>
                    <!-- <button v-on:click="onInboxClicked">Inbox</button> -->
                    <!-- <button v-on:click="onSentClicked">Sent</button> -->
                    <email-status class="email-app-nav-status" v-bind:emails="emails"></email-status>
                </nav>
                <main class="email-app-main">
                    <router-view></router-view>
                    <email-list v-show="!isCompose && !isDetails" v-bind:emails="emailsToShow" v-on:delete="onDeleteEmail" v-on:click.native="emailListClicked"></email-list>
                    <email-compose v-if="isCompose" v-on:close="onCloseCompose" v-on:send="onSendEmail" :emailProp="email" :reply="false"></email-compose>
                </main>
                <nav class="email-app-nav">
                </nav>
            </div>
            <!-- <router-link to="/about">Inbox</router-link> -->
            <!-- <user-msg></user-msg> -->
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
            isInbox: true,
            isDetails: false,
            isShowNav: true,
            email: {
                from: 'nirfuchs@appsus.com',
                to: 'nirfuchs@appsus.com',
                cc: '',
                subject: '',
                body: ''
            },
        }
    },
    methods: {
        onComposeClicked() {
            // console.log('Compose new email');
            this.$router.push('/email');
            this.isCompose = true;
        },
        onCloseCompose() {
            this.isCompose = false;
        },
        onSendEmail(emailObj) {
            // console.log(emailObj);
            // this.$router.push('/email');
            emailService.addEmail(emailObj)
                .then(() => {
                    // console.log('Email was sent');
                    // var message = { msg: 'Success! Email was sent', type: 'success' };
                    // eventBus.$emit(SEND_EMAIL, { ...message });
                    this.isCompose = false;
                }).catch((res) => {
                    // var message = { msg: 'Error! ' + res, type: 'error' };
                    // eventBus.$emit(SEND_EMAIL, { ...message });
                    this.isCompose = false;
                });
        },
        onDeleteEmail(emailId) {
            // console.log(emailId);
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
            this.isCompose = false;
            this.isDetails = false;
            this.isInbox = true;
            this.$router.push('/email');
        },
        onSentClicked() {
            this.isCompose = false;
            this.isDetails = false;
            this.isInbox = false;
            this.$router.push('/email');
        },
        emailListClicked() {
            // console.log('emailListClicked');
            this.isDetails = true;
        },
        onToggleNav() {
            this.isShowNav = !this.isShowNav;
        }
    },
    computed: {
        emailsToShow() {
            // filter by text in subject and body
            var emailList = this.emails.filter(email => {
                return email.subject.toLowerCase().includes(this.filterBy.text.toLowerCase()) ||
                    email.body.toLowerCase().includes(this.filterBy.text.toLowerCase());
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

            return emailList.reverse();
        },
        classObjectInbox() {
            return {
                'font-bold': this.isInbox,
                'font-normal': !this.isInbox
            }
        },
        classObjectSent() {
            return {
                'font-bold': !this.isInbox,
                'font-normal': this.isInbox
            }
        }
    },
    created() {
        emailService.getEmails()
            .then(emails => this.emails = emails);

    },
    mounted() {
        eventBus.$on(DETAILS_CLOSED, message => {
            // console.log(message);
            this.isDetails = false;
        });
    },
    components: {
        emailList,
        emailStatus,
        emailFilter,
        emailSort,
        emailCompose,
        userMsg
    }
}