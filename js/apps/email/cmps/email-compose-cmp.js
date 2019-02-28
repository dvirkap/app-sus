import modal from './modal-cmp.js';
import utilsService from '../../services/utils-service.js';

export default {
    template: `
        <section class="email-compose">
            <modal>
                <table slot="header" width="100%" border="1">
                    <tr>
                        <th colspan="2"><h3>New Message</h3></th> 
                    </tr>
                    <tbody>
                        <tr>
                            <td><h6>To:</h6></td>
                            <td><input type="text" v-model="email.to"></td>
                        </tr>
                        <tr>
                            <td><h6>Cc:</h6></td>
                            <td><input type="text" v-model="email.cc"></td>
                        </tr>
                        <!-- <tr>
                            <td><h6>Bcc:</h6></td>
                            <td><input type="text"></td>
                        </tr> -->
                        <tr>
                            <td><h6>Subject:</h6></td>
                            <td><input type="text" v-model="email.subject"></td>
                        </tr>
                    </tbody>
                </table>
                <textarea slot="body" rows="4" cols="40" v-model="email.body"></textarea>
                <button slot="footer" class="modal-default-button" v-on:click="onCloseModal">Close</button>
                <button slot="footer" class="modal-default-button" v-on:click="onSendEmail" :disabled="isDisabled">Send</button>
            </modal>
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
            this.$emit('close');
            this.$router.push('/email');
        },
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
        }
    },
    created() {

    },
    components: {
        modal,
        utilsService
        // reviewAdd,
        // reviewDisplay
    }
}