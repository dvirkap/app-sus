import emailService from '../services/email-service.js';


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
    `,
    data() {
        return {
            email: null,
        }
    },
    methods: {
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

    }
}