import emailPreview from './email-preview-cmp.js';

export default {
    props: ['emails'],
    template: `
    <section class="email-list flex">
        <router-link class="email-list-row flex" v-for="(currEmail, idx) in emails" :key="currEmail.id" :to="'/email/' + currEmail.id">
            <!-- <div class="email-list-row flex"> -->
                <email-preview class="email-list-preview" v-bind:email="currEmail"></email-preview>
                <div class="email-list-buttons flex">
                    <button class="email-list-btn-delete" v-on:click.stop.prevent="onDeleteEmail(currEmail)"></button>
                    <button v-show="!currEmail.isRead" class="email-list-btn-unread" v-on:click.stop.prevent="onToggleIsRead(currEmail)"></button>
                    <button v-show="currEmail.isRead" class="email-list-btn-read" v-on:click.stop.prevent="onToggleIsRead(currEmail)"></button>
                </div>
            <!-- </div> -->
        </router-link>
    </section>
        <!-- <section> -->
            <!-- <div>Email List</div> -->
            <!-- <div class="email-list">
                <table border="1">
                    <tbody>
                        <router-link class="flex" v-for="(currEmail, idx) in emails" :key="currEmail.id" :to="'/email/' + currEmail.id">
                            <tr>
                                <td nowrap class="email-list-td">
                                    <email-preview v-bind:email="currEmail">
                                    </email-preview>
                                </td>
                                <td>
                                    <button class="email-list-btn-delete" v-on:click.stop.prevent="onDeleteEmail(currEmail)"></button>
                                </td>
                                <td>
                                    <button v-show="!currEmail.isRead" class="email-list-btn-unread" v-on:click.stop.prevent="onToggleIsRead(currEmail)"></button>
                                    <button v-show="currEmail.isRead" class="email-list-btn-read" v-on:click.stop.prevent="onToggleIsRead(currEmail)"></button>
                                </td>
                            </tr>
                        </router-link>
                    </tbody>
                </table>
            </div> -->
            
            <!--<div class="email-list flex">
                <email-preview v-for="(currEmail, idx) in emails" v-bind:email="currEmail" :key="currEmail.id" v-on:click.native="selectEmail(currEmail)">
                </email-preview>
            </div>-->
        <!-- </section> -->
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
        },
        // checkboxClicked() {
        //     console.log('checkboxClicked');
        // }
    },
    computed: {

    },

    components: {
        emailPreview
    }
}