export default {
    template: `
        <section class="email-filter">
            Search: <input type="text" placeholder="Filter by text" v-on:keyup.enter="emitFilter" v-model="filterBy.text" />
            <select v-model="filterBy.type">
                <option value="All" selected>All</option>
                <option value="Read">Read</option>
                <option value="Unread">Unread</option>
            </select>
            <button v-on:click="emitFilter">Filter</button>
        </section>
    `,
    data() {
        return {
            filterBy: {
                text: '',
                type: 'All'
            }
        }
    },
    methods: {
        emitFilter() {
            console.log('Emitting to Parent');
            this.$emit('filtered', { ...this.filterBy });
        }
    }
}