import createNoteId from '../../services/utils-service.js'

export default {
    template: `
<!-- <section> -->
    <div>
        <input type="text" v-bind:class="{ alert: isTitleActive }" @input="addNewNote()" v-model="myTitle" placeholder="Title">
        <input type="textarea" v-bind:class="{ alert: isTextActive }" @input="addNewNote()" v-model="myText" placeholder="Add a few words...">
        <button @click="getNewNoteType('img')">image</button>
        <button @click="getNewNoteType('video')">video</button>
        <pre>{{newNote}}</pre>
        {{myTitle}}
        {{myText}}
        <!-- <section> -->
    </div>

`,


data() {
    return {
        newNote: null,
        myTitle: null,
        myText: null,
        isTitleActive: false,
        isTextActive: false,
        isAddNoteActivated: true,

        }
    },
    methods: {

        addNewNote() {
            // console.log(this.myTitle, ' ', this.myText);

        },

        getNewNoteType(val) {
            if (!this.myTitle) {
                this.isTitleActive = true
            } else if  (!this.myText) {
                this.isTextActive = true
        } else {
            this.newNote = {
                "id": createNoteId.makeId(8),
                "type": val,
                "title": this.myTitle,
                "txt": this.myText,
                "dateCreated": Date.now(),
                "img": "image url",
                "video": "video url",
                "categories": [''],
                "listItems": [''],
                "sound": "sound url from local storage",
                "isPinned": false,
                "isDeleted": false,
                "color": "white"
            }
        }


    },

    //   titleTextValidation() {
    //     if(this.isTitleActive === true) {
    //         if(this.myTitle || this.myText) {
    //             this.isTitleActive = true
    //         } else {
    //             this.isTitleActive = false;
    //         }

    //     }
    //   }


},
computed: {
    function() {



    }
    // {
    // }

},
watch: {
    myTitle(val) {
        if (val) {
            this.isTitleActive = false
        }
        },
        myTExt(val) {
        if (val) {
            this.isTextActive = false
        }

    }


}

}