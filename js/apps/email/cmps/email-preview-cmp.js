export default {
    props: ['email'],
    template: `
        <div class="email-item flex">
            <h6 v-bind:class="classObject">{{email.subject}}</h6>
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