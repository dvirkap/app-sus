export default {
    props: ['emails'],
    template: `
        <div class="email-status flex">
            <!--<h6 v-bind:class="classObject">{{email.subject}}</h6>-->
            <h6>Status: {{unreadEmails}} Unread Emails</h6>
        </div>
    `,
    methods: {
    },
    computed: {
        unreadEmails() {
            var unReadEmails = this.emails.filter((email => !email.isRead && email.to === 'nirfuchs@appsus.com'));
            return unReadEmails.length;
        }
    }
}