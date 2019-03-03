export default {
    props: ['email'],
    template: `
        <!-- <div class="email-preview" v-bind:class="classObject">{{email.from}} {{email.subject}}</div> -->
        <div class="email-preview" v-bind:class="classObject">{{email.subject}}</div>
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