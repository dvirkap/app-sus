import emailService from '../services/email-service.js';
import emailCompose from '../cmps/email-compose-cmp.js';
import userMsg from './user-msg-cmp.js';
import noteService from '../../keep/services/note-service.js';
import { eventBus, SEND_EMAIL, DETAILS_CLOSED } from '../../services/eventbus-service.js';

export default {
    // props: ['email'],
    template: `
        <section v-if="email" class="email-details flex">
            <div v-show="!isReply" class="font-bold">{{email.subject}}</div>
            <div v-show="!isReply">From: {{email.from}}</div>
            <div v-show="!isReply">To: {{email.to}}</div>
            <div v-show="!isReply">Cc: {{email.cc}}</div>
            <div v-show="!isReply">Sent at: {{fornatedDate}}</div>
            <!-- <hr> -->
            <textarea v-show="!isReply" class="email-details-textarea" rows="15" cols="40" readonly>{{email.body}}</textarea>
            <!-- <p>{{email.body}}</p> -->
            <!-- <hr> -->
            <div v-show="!isReply" class="email-details-btn-container flex">
                <!-- <router-link to="/email" class="email-details-link">Back to Inbox</router-link> -->
                <button class="email-details-btn" v-on:click="onKeepEmail">Keep</button>
                <button class="email-details-btn" v-on:click="onCloseEmail">Close</button>
                <button class="email-details-btn" v-on:click="onReplyEmail">Reply</button>
                <button class="email-details-btn" v-on:click="onUnreadEmail">Make unread</button>
                <button class="email-details-btn" v-on:click="onDeleteEmail">Delete</button>
            </div>
            <email-compose v-if="isReply" v-on:close="onCloseReply" v-on:send="onSendReplyEmail" :emailProp="email" :reply="true"></email-compose>
            <!-- <user-msg></user-msg> -->
        </section>
    `,
    data() {
        return {
            email: null,
            isReply: false
        }
    },
    methods: {
        onCloseEmail() {
            eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
            this.$router.push('/email');
        },
        onDeleteEmail() {
            emailService.deleteEmail(this.email.id)
                .then(() => {
                    console.log('Email was deleted');
                    eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
                    this.$router.push('/email');
                });
        },
        onUnreadEmail() {
            this.email.isRead = false;
            eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
            this.$router.push('/email');
        },
        onReplyEmail() {
            this.isReply = true;
        },
        onCloseReply() {
            // console.log('onCloseReply');
            eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
            this.isReply = false;
            this.$router.push('/email');
        },
        onSendReplyEmail(emailObj) {
            // console.log(emailObj);
            emailObj.sentAt = Date.now();
            emailService.addEmail(emailObj)
                .then((res) => {
                    // console.log('Reply Email was sent');
                    // var message = { msg: 'Success! Reply Email was sent', type: 'success' };
                    // eventBus.$emit(SEND_EMAIL, { ...message });
                    eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
                    this.isReply = false;
                    this.$router.push('/email');
                }).catch((res) => {
                    // var message = { msg: 'Error! ' + res, type: 'error' };
                    // eventBus.$emit(SEND_EMAIL, { ...message });
                });
        },
        onKeepEmail() {
            var noteObj = {
                title: this.email.subject,
                txt: this.email.body,
                dateCreated: Date.now()
            }
            noteService.addNote(noteObj)
                .then((res) => {
                    // console.log(res);
                    eventBus.$emit(DETAILS_CLOSED, 'Details was closed');
                    this.$router.push('/email');
                });
        }
    },
    computed: {
        fornatedDate() {
            var date = new Date(this.email.sentAt);
            var day = date.getDate();
            var month = date.getMonth() + 1;
            if (month < 10) month = '0' + month;
            var year = date.getFullYear();
            return day + '/' + month + '/' + year;
        }
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

    },
    watch: {

    },

    components: {
        emailCompose,
        userMsg,
        noteService
    }
}