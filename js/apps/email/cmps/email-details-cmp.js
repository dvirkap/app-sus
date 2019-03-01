import emailService from '../services/email-service.js';
import emailCompose from '../cmps/email-compose-cmp.js';

export default {
    // props: ['email'],
    template: `
        <section v-if="email" class="email-details email-wrapper flex">
            <div v-show="!isReply" class="font-bold">{{email.subject}}</div>
            <div v-show="!isReply">From: {{email.from}}</div>
            <div v-show="!isReply">To: {{email.to}}</div>
            <div v-show="!isReply">Cc: {{email.cc}}</div>
            <div v-show="!isReply">Sent at: {{fornatedDate}}</div>
            <!-- <hr> -->
            <textarea v-show="!isReply" class="email-details-textarea" rows="12" cols="40" readonly>{{email.body}}</textarea>
            <!-- <p>{{email.body}}</p> -->
            <!-- <hr> -->
            <div v-show="!isReply" class="email-details-btn-container flex">
                <!-- <router-link to="/email" class="email-details-link">Back to Inbox</router-link> -->
                <button class="email-details-btn" v-on:click="onCloseEmail">close</button>
                <button class="email-details-btn" v-on:click="onReplyEmail">Reply</button>
                <button class="email-details-btn" v-on:click="onUnreadEmail">Make unread</button>
                <button class="email-details-btn" v-on:click="onDeleteEmail">Delete</button>
            </div>
            <email-compose v-if="isReply" v-on:close="onCloseReply" v-on:send="onSendReplyEmail" :emailProp="email" :reply="true"></email-compose>
            
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
            this.$router.push('/email');
        },
        onDeleteEmail() {
            emailService.deleteEmail(this.email.id)
                .then(() => {
                    console.log('Email was deleted');
                    this.$router.push('/email');
                });
        },
        onUnreadEmail() {
            this.email.isRead = false;
            this.$router.push('/email');
        },
        onReplyEmail() {
            this.isReply = true;
        },
        onCloseReply() {
            console.log('onCloseReply');
            this.isReply = false;
            this.$router.push('/email');
        },
        onSendReplyEmail(emailObj) {
            // console.log(emailObj);
            this.email.sentAt = Date.now();
            emailService.addEmail(emailObj)
                .then(() => {
                    console.log('Reply Email was sent');
                    this.isReply = false;
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
        emailCompose
    }
}