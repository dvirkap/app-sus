import { eventBus, SEND_EMAIL } from '../../services/eventbus-service.js';

export default {
    props: ['type'],
    template: `
    <div v-show="isShow" v-on:click="onClose" class="user-msg" v-bind:class="classObject">
        {{message.msg}} 1111 <button v-on:click="onClose">x</button>
    </div>
    `,
    data() {
        return {
            // msg: '',
            isShow: false,
            message: {
                msg: '',
                type: ''
            }
        }
    },
    methods: {
        onClose() {
            this.isShow = false;
        }

    },
    computed: {
        classObject() {
            return {
                'red-bg': this.message.type === 'error',
                'green-bg': this.message.type === 'success'
            }
        }
    },

    created() {
        // console.log('user-msg-cmp was created');
        eventBus.$on(SEND_EMAIL, message => {
            this.isShow = true;
            this.message = message;
            console.log(this.message.msg);
        });
    },

    beforeDestroy() {
        // console.log('beforeDestroy',this.message.msg);
    },
    destroyed() {
        // console.log('user-msg-cmp was destroyed');
    },

    watch: {
        message: function () {
            this.isShow = true;
        }
    }
}