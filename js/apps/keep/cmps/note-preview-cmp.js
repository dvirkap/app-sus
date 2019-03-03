// import noteAddCmp from "./note-add-cmp";
import noteService from '../services/note-service.js';

// import noteList from  ''


export default {
    props:['note'],
    template: `
        <section class="shadow-drop-2-center keep-preview-container" v-bind:style="{ 'background-color': note.color }">
            <div class="keep-preview-title">{{note.title}}</div>
            <div class="keep-preview-txt">{{note.txt}}</div>
            <img class="keep-new-note-img" v-show="note.img !== 'image url'" v-bind:src="note.img" /> 
        <iframe :class="{'keep-hidden' : !note.video}" v-show="note.video !== 'video url'" class="keep-new-note-img" v-bind:src="'https://www.youtube.com/embed/' + note.video" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        </section>

    `,
    //  "id": this.noteId,
     // "type": this.noteType,
     // "title": this.myTitle,
     // "txt": this.myText,
     // "dateCreated": Date.now(),
     // "img": this.imageurl,
     // "video": this.videourl,
     // "categories": [this.categories],
     // "listItems": [''],
     // "sound": "sound url from local storage",
     // "isPinned": false,
     // "isDeleted": false,
     // "color": this.colorVal

    // data() {
    //     return{
    //         note: null,
    //     }
    // },
    created() {
        if (this.note.img !== 'image url')
            console.log(this.note.img);
            
            // noteService.postionPinnedNotesOnTop(note.id)
        
    },

    }