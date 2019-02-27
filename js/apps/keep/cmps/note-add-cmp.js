export default {
template: `

    <section>
        <input type="text" @input="addNewNote()" v-model="myTitle" placeholder="Title">
        <input type="textarea" @input="addNewNote()" v-model="myText" placeholder="Add a few words...">
        {{myTitle}}
        {{myText}}
</section>
        `,


data() {
    return {
        newNote: null,
        myTitle: null,
        myText: null
    }
},
methods: {
    addNewNote(){
        console.log();
        
    }
}

}