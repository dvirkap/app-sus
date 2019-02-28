import emailPreview from './email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
        <section>
            <h5>Email List</h5>
            <div class="email-list flex">
                <router-link class="flex" v-for="(currEmail, idx) in emails" :key="currEmail.id" :to="'/email/' + currEmail.id">
                    <email-preview v-bind:email="currEmail">
                    </email-preview>
                    <button v-on:click.stop.prevent="onDeleteEmail(currEmail)">Delete</button>
                    <button v-on:click.stop.prevent="onToggleIsRead(currEmail)">Read\\Unread</button>
                </router-link>
            </div>
            
            <!--<div class="email-list flex">
                <email-preview v-for="(currEmail, idx) in emails" v-bind:email="currEmail" :key="currEmail.id" v-on:click.native="selectEmail(currEmail)">
                </email-preview>
            </div>-->
        </section>
    `,
    data() {
        return {

        }
    },
    methods: {
        onDeleteEmail(email) {
            this.$emit('delete', email.id);
        },

        onToggleIsRead(email) {
            email.isRead = !email.isRead;
        }
    },
    computed: {

    },

    components: {
        emailPreview
    }
}