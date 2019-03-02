export default {
    props: ['emails'],
    template: `
        <section class="email-sort">
            Sort:
            <select v-model="sortBy" v-on:change="onSortChang">
                <option value="Date" selected>Date</option>
                <option value="Title">Title</option>
            </select>
        </section>
    `,
    data() {
        return {
            sortBy: 'Date'
        }
    },
    methods: {
        onSortChang() {
            // console.log('sortBy', this.sortBy);
            if (this.sortBy === 'Date') { //sort by Date
                this.emails.sort(this.sortCreatedAt);
            } else { //sort by Title
                this.emails.sort(this.sortText);
            }
        },
        sortCreatedAt(a, b) {
            return a.sentAt - b.sentAt;
        },
        sortText(a, b) {
            // return a.txt.toLowerCase() - b.txt.toLowerCase();
            var txtA = a.subject.toLowerCase();
            var txtB = b.subject.toLowerCase();
            if (txtA < txtB) {
                return 1;
            }
            if (txtA > txtB) {
                return -1;
            }
            return 0;
        },
    },

    created() {
        // console.log('sort componet was created');
        this.emails.sort(this.sortCreatedAt);
    }
}