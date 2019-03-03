export default {
    props: ['emails'],
    template: `
        <!-- <div class="email-status">Status: {{unreadEmails}} Unread Emails</div> -->
        <button class="email-status font-bold">{{unreadEmails}} Unread</button>
    `,
    methods: {
    },
    computed: {
        unreadEmails() {
            var unReadEmails = this.emails.filter((email => !email.isRead && email.to === 'nirfuchs@appsus.com'));
            return unReadEmails.length;
        }
    },
    created() {
        // console.log(this.emails);
    }
}