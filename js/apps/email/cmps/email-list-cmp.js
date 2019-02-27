import emailPreview from './email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
        <section>
            <h5>Email List</h5>
            <div class="email-list flex">
                <router-link v-for="(currEmail, idx) in emails" :key="currEmail.id" :to="'/email/' + currEmail.id">
                    <email-preview v-bind:email="currEmail">
                    </email-preview>
                </router-link>
            </div>
            
            <!--<div class="email-list flex">
                <email-preview v-for="(currEmail, idx) in emails" v-bind:email="currEmail" :key="currEmail.id" v-on:click.native="selectEmail(currEmail)">
                </email-preview>
            </div>-->
        </section>
    `,
    methods: {
        // selectEmail(email) {
        //     console.log(email);
        //     console.log(email.id);
        //     this.$emit('selected', email.id);
        // }
    },

    components: {
        emailPreview
    }
}