import createNoteId from '../../services/utils-service.js'
import noteService from '../services/note-service.js';
// import Verte from '../../../../lib/node_modules/verte/dist/verte.js';
  import '../../../../lib/jscolor/jscolor.js';

export default {
    template: `
<!-- <section> -->
    <div >
        <form id="newNote" @click="listenToClick">
        <input type="text"  v-bind:class="{ alert: isTitleActive }" @input="addNewNote()" v-model="myTitle" placeholder="Title">
        <input type="text" @input="addNewNote()" v-model="categories" placeholder="categories">
        <textarea v-bind:class="{ alert: isTextActive }" @input="addNewNote()" v-model="myText" placeholder="Add a few words..."></textarea>
        <!-- <button @click="getNewNoteType('video')">video</button> -->
        <img class="keep-new-note-img" v-bind:src="imageurl" /> 
        <!-- <img class="keep-new-note-img" v-bind:src="videourl + 'hqdefault.jpg'" />  -->
        <iframe :class="{'keep-hidden' : !videourl}" class="keep-new-note-img" v-bind:src="'https://www.youtube.com/embed/' + videourl" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe> 
        <input class="fas fa-palette jscolor" ref="colorVal" @change="updateColor">

        </form>
    
    <pre>{{newNote}}</pre>
    {{myTitle}}
    {{myText}}
    {{categories}}
  
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
        listenToClick(ev){
           
        },
        updateColor() {
            // 'jscolor' instance can be used as a string
           var currColor = this.$refs.colorVal.style.backgroundColor;
           this.colorVal = currColor;
            this.$emit('bgcolor', this.colorVal)
            // console.log('this.colorVal',this.colorVal );
         
            
        },
        addNewNote() {
            if (this.myText) {
                // var str = 
                // var str = 
                console.log('this.isNoteCreated', this.isNoteCreated);
                
                // var result = regExp(str, '(?<=http).+?(?=jpg)', 'match')
                if(this.myTitle && this.myText && this.isNoteCreated === false) {
                    this.isNoteCreated  = true
                    // console.log(ev.target.localName);
                    console.log('outside touch detected');
                    console.log('note.id:', this.newNote.id);
                    noteService.addNote(this.newNote).then(() => {
                        console.log('yes');
        })
             }
                
                if(this.myText.includes('jpeg') || this.myText.includes('png') || this.myText.includes('gif') || this.myText.includes('jpeg')) {
                    this.noteType = 'image'
                    var result = null;
                    var regExp = /\bhttp.*/;
                    result = regExp.exec(this.myText);                    
                    var tempStr = this.myText.replace(regExp, '')
                    this.myText = tempStr
                    var imageurl = result
                    this.imageurl = imageurl;
                    console.log('restul:', result);
                    
                    
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
        }
    },

},

}

