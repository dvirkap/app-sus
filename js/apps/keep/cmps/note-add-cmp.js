import createNoteId from '../../services/utils-service.js'
import noteService from '../services/note-service.js';
// import Verte from '../../../../lib/node_modules/verte/dist/verte.js';
  import '../../../../lib/jscolor/jscolor.js';
  import { eventBus, NEW_NOTE_CREATED } from '../../services/eventbus-service.js';

export default {
    template: `
<!-- <section> -->
    <div >
        <form id="newNote" @click="listenToClick" ref="form">
        <input type="text" id="title" ref="title" v-bind:class="{ alert: isTitleActive }" @input="addNewNote()" v-model="myTitle" placeholder="Title">
        <input type="text" @input="addNewNote()" v-model="categories" placeholder="categories">
        <textarea v-bind:class="{ alert: isTextActive }" @input="addNewNote()" v-model="myText" placeholder="Add a few words..."></textarea>
        <!-- <button @click="getNewNoteType('video')">video</button> -->
        <img class="keep-new-note-img" v-bind:src="imageurl" /> 
        <!-- <img class="keep-new-note-img" v-bind:src="videourl + 'hqdefault.jpg'" />  -->
        <iframe :class="{'keep-hidden' : !videourl}" class="keep-new-note-img" v-bind:src="'https://www.youtube.com/embed/' + videourl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        <!-- <input class="fas fa-palette jscolor" ref="colorVal" @change="updateColor"> -->
        <button @click="updateColor" class="color-dot" v-bind:style="{ 'background-color': '#6495ED' }"></button>
        <button @click="updateColor" class="color-dot" v-bind:style="{ 'background-color': '#FF69B4' }"></button>
        <button @click="updateColor" class="color-dot" v-bind:style="{ 'background-color': '#E0FFFF' }"></button>
        <button @click="updateColor" class="color-dot" v-bind:style="{ 'background-color': '#00FA9A' }"></button>
        <button @click="saveNewNote" >Close</button>

        </form>
    
    <!-- <pre>{{newNote}}</pre>
    {{myTitle}}
    {{myText}}
    {{categories}} -->
  
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
        colorVal: null,
        categories: null,
        noteType: 'text',
        imageurl:null,
        videourl:null,
        noteId: null,
        isNoteCreated: false,

        }
    },
    methods: {
        saveNewNote() {
            eventBus.$emit(NEW_NOTE_CREATED, this.isNoteCreated);
            
            },
        listenToClick(ev){
        //    console.log('ev:', ev.target.id);  
           if(this.$refs.title.id !== ev.target.id )
           console.log('success');
           
        //    console.log('ev  :', this.$refs.title.id);  
        //    console.log('ev:', ev.target.id);  
           
        },
        updateColor(val) {
            console.log('this.colorVal:',val.target.style.backgroundColor );
            this.colorVal = val.target.style.backgroundColor
            console.log(this.$refs.form.style.backgroundColor = this.colorVal);
            
            // 'jscolor' instance can be used as a string
        //    var currColor = this.$refs.colorVal.style.backgroundColor;
        //    this.colorVal = currColor;
        //     this.$emit('bgcolor', this.colorVal)
         
            
        },
        addNewNote() {
            if (this.myText) {
                if(this.myTitle && this.myText && this.isNoteCreated === false) {
                    
                    this.isNoteCreated  = true
                    
                    // console.log('outside touch detected');
                    // console.log('note.id:', this.newNote.id);
                    noteService.addNote(this.newNote).then((res) => {
                        console.log('idddd:',res.id);
                        // console.log('yes');
                        this.noteId = res.id

                    })
                }
                if(this.isNoteCreated) {
                    // noteService.getNotesById()
                    // this.newNote.id = this.noteId;
                    // console.log('update note by id',this.newNote.id );
                    noteService.saveNotesById(this.noteId, this.newNote)
                    // noteService.saveNotesById(this.newNote.id, this.newNote)
                    
                }
                // console.log('this.isNoteCreated', this.isNoteCreated);
                
                if(this.myText.includes('jpeg') || this.myText.includes('png') || this.myText.includes('gif') || this.myText.includes('jpeg')|| this.myText.includes('picsum')) {
                    this.noteType = 'image'
                    var result = null;
                    var regExp = /\bhttp.*/;
                    result = regExp.exec(this.myText);                    
                    var tempStr = this.myText.replace(regExp, '')
                    this.myText = tempStr
                    var imageurl = result
                    this.imageurl = imageurl;
                    console.log('restul:', result);
                    // noteService.saveNotesById(this.newNote.id, this.newNote)
                    
                }
                
                if(this.myText.includes('youtu')) { 
                    this.noteType = 'video'
                    var regExp = /\b((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
                    var result = regExp.exec(this.myText);
                    console.log(result[0]);
                    var tempStr = this.myText.replace(regExp, '')
                    this.myText = tempStr
                    var currVideoUrl = result[0]
                    regExp = /=(.*)/ 
                    this.videourl = currVideoUrl;
                    result = regExp.exec(currVideoUrl);
                    this.videourl = result[0].substring(1)
                    console.log(this.videourl);
                    // noteService.saveNotesById(this.newNote.id, this.newNote)
                }
                
            }
        
    
            
            this.newNote = {
                "id": this.noteId,
                "type": this.noteType,
                "title": this.myTitle,
                "txt": this.myText,
                "dateCreated": Date.now(),
                "img": this.imageurl,
                "video": this.videourl,
                "categories": [this.categories],
                "listItems": [''],
                "sound": "sound url from local storage",
                "isPinned": false,
                "isDeleted": false,
                "color": this.colorVal
            }
        }

        },

        getNewNoteType(val) {
            // console.log(this.colorVal);
            
            if (!this.myTitle) {
                this.isTitleActive = true
            } else if  (!this.myText) {
                this.isTextActive = true
        } else {
            this.noteType = val;
            
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
watch: {
    myTitle(val) {
        if (val) {
            this.isTitleActive = false
        }
        },
        myText(val) {
        if (val) {
            this.isTextActive = false
        }

    },
    noteId(val) {
        if(!val) {
           val = createNoteId.makeId(8)
           console.log('iddddd:', this.noteId);
           
        }
    },

},

}

