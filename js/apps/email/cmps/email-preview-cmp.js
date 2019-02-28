export default {
    props: ['email'],
    template: `
        <div class="email-preview">
            <h6 v-bind:class="classObject">{{email.from }} {{email.subject}}</h6>
        </div>
    `,
    methods: {
    },
    computed: {
        classObject() {
            return {
                'font-bold': !this.email.isRead,
                'font-normal': this.email.isRead
            }
        }
    }
}