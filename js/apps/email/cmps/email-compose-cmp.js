import modal from './modal-cmp.js';
import utilsService from '../../services/utils-service.js';
import emailService from '../services/email-service.js';

export default {
    template: `
        <section class="email-compose email-wrapper flex">
            <h4>New Message</h4>
            <div class="flex">
                <label class="email-compose-label">To:</label>
                <input class="email-compose-text" type="text" v-model="email.to" >
            </div>
            <div class="flex">
                <label class="email-compose-label">Cc:</label>
                <input class="email-compose-text" type="text" v-model="email.cc" >
            </div>
            <div class="flex">
                <label class="email-compose-label">Subject:</label>
                <input class="email-compose-text" type="text" v-model="email.subject">
            </div>
            <textarea class="email-compose-textarea" rows="12" cols="40" v-model="email.body"></textarea>
            <div class="email-compose-btn flex">
                <button class="email-compose-close" v-on:click="onCloseModal">Close</button>
                <button class="email-compose-send" v-on:click="onSendEmail" :disabled="isDisabled">Send</button>
            </div>
        </section>
    `,
    data() {
        return {
            email: {
                from: 'nirfuchs@appsus.com',
                to: '',
                cc: '',
                subject: '',
                body: ''
            },
        }
    },
    methods: {
        onCloseModal() {
            // this.$emit('close');
            this.$router.push('/email');
        },
        onSendEmail() {
            this.email.sentAt = Date.now();
            emailService.addEmail(this.email)
                .then(() => {
                    console.log('Email was sent');
                    // this.isCompose = false;
                    this.$router.push('/email');
                });
        },
        // onSendEmail() {
        //     this.email.sentAt = Date.now();
        //     this.$emit('send', { ...this.email });
        // },
    },
    computed: {
        isDisabled() {
            var valid = false;
            var to = utilsService.validateEmail(this.email.to);
            var cc = true;
            if (this.email.cc !== '') {
                cc = utilsService.validateEmail(this.email.cc);
            }
            var subject = this.email.subject !== '';
            var body = this.email.body !== '';

            if (to && cc && subject && body) valid = true;
            return !valid;
        }
    },
    created() {
        console.log('email-compose was created');
    },
    components: {
        modal,
        utilsService,
        emailService
        // reviewDisplay
    }
}