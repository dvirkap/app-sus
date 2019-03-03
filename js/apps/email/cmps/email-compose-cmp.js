import modal from './modal-cmp.js';
import utilsService from '../../services/utils-service.js';
import emailService from '../services/email-service.js';
import userMsg from './user-msg-cmp.js';

export default {
    props: ['emailProp', 'reply'],
    template: `
        <section class="email-compose flex">
            <div class="font-bold">New Message</div>
            <div class="flex">
                <!-- <label class="email-compose-label">To:</label> -->
                <input class="email-compose-text" placeholder="To:" type="text" v-model="email.to">
            </div>
            <div class="flex">
                <!-- <label class="email-compose-label">Cc:</label> -->
                <input class="email-compose-text" placeholder="Cc:" type="text" v-model="email.cc">
            </div>
            <div class="flex">
                <!-- <label class="email-compose-label">Subject:</label> -->
                <input class="email-compose-text" placeholder="Subject:" type="text" v-model="email.subject">
            </div>
            <textarea class="email-compose-textarea" rows="12" cols="40" v-model="email.body"></textarea>
            <div class="email-compose-btn-container flex">
                <button class="email-compose-btn" v-on:click="onCloseCompose">Close</button>
                <button class="email-compose-btn" v-on:click="onSendEmail" :disabled="isDisabled">Send</button>
            </div>
            <!-- <user-msg></user-msg> -->
        </section>
    `,
    data() {
        return {
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
        onCloseCompose() {
            this.$emit('close');
            // this.$router.push('/email');
        },
        // onSendEmail() {
        //     this.email.sentAt = Date.now();
        //     emailService.addEmail(this.email)
        //         .then(() => {
        //             console.log('Email was sent');
        //             // this.isCompose = false;
        //             this.$router.push('/email');
        //         });
        // },
        onSendEmail() {
            this.email.sentAt = Date.now();
            this.$emit('send', { ...this.email });
        },
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
        },
    },
    created() {
        // console.log('email-compose was created');
        // console.log(this.emailProp);
        // console.log(this.reply);
        if (this.reply) {
            this.email = { ...this.emailProp };
            this.email.subject = 'Re:' + this.email.subject;
            this.email.to = this.email.from;
            this.email.from = 'nirfuchs@appsus.com';
        }
    },
    watch: {
    },
    components: {
        modal,
        utilsService,
        emailService,
        userMsg
    }
}