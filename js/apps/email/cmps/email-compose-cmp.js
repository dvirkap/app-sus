import modal from './modal-cmp.js';

export default {
    template: `
        <section class="email-compose">
            <modal v-on:close="onCloseModal" v-on:send="onSendEmail">
                <h3 slot="header">New Message</h3>
                <h6 slot="header">To:</h6>
                <h6 slot="header">Cc:</h6>
                <h6 slot="header">Bcc:</h6>
                <h6 slot="header">Subject:</h6>
                <!--<long-text slot="body" v-bind:txt="book.description"></long-text>
                <review-display slot="body" v-bind:reviews="book.reviews" v-on:delete="onDeleteReview"></review-display>
                <review-add slot="body" v-on:reviewed="onSaveReview"></review-add>-->
            </modal>
        </section>
    `,
    data() {
        return {
            // isShowModal: false
        }
    },
    methods: {
        onCloseModal() {
            // console.log('onCloseModal');
            this.$emit('close');
            // this.isShowModal = false;
            this.$router.push('/email');
        },
        onSendEmail() {
            this.$emit('send');
        }
    },
    created() {
        // this.isShowModal = true;
    },
    components: {
        modal
        // longText,
        // reviewAdd,
        // reviewDisplay
    }
}