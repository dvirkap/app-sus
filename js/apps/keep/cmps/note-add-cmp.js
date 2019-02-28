import createNoteId from '../../services/utils-service.js'
// import Verte from '../../../../lib/node_modules/verte/dist/verte.js';
  import '../../../../lib/jscolor/jscolor.js';

export default {
    template: `
<!-- <section> -->
    <div >
        <form>
        <input type="text"  v-bind:class="{ alert: isTitleActive }" @input="addNewNote()" v-model="myTitle" placeholder="Title">
        <input type="text" @input="addNewNote()" v-model="categories" placeholder="categories">
        <textarea v-bind:class="{ alert: isTextActive }" @input="addNewNote()" v-model="myText" placeholder="Add a few words..."></textarea>
        <!-- <button @click="getNewNoteType('video')">video</button> -->
        <img class="keep-new-note-img" v-bind:src="imageurl" /> 
        <!-- <img class="keep-new-note-img" v-bind:src="videourl + 'hqdefault.jpg'" />  -->
        <iframe :class="{'keep-hidden' : !videourl}" class="keep-new-note-img" v-bind:src="'https://www.youtube.com/embed?v=' + videourl"></iframe> 
        <input class="fas fa-palette jscolor" ref="colorVal" @change="updateColor">
        <input type="submit" value="Add note" @click="addNewNote">

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
        noteType: null,
        imageurl:null,
        videourl:null,

        }
    },
    methods: {
        updateColor() {
            // 'jscolor' instance can be used as a string
           var currColor = this.$refs.colorVal.style.backgroundColor;
           this.colorVal = currColor;
            this.$emit('bgcolor', this.colorVal)
            // console.log('this.colorVal',this.colorVal );
         
            
        },
        addNewNote() {
            if (this.myText) {
                if(this.myText.includes('jpeg') || this.myText.includes('png') || this.myText.includes('gif') || this.myText.includes('jpeg')) {
                    this.noteType = 'image'
                    var result = null;
                    var regExp = /\bhttp.*/;
                        result = regExp.exec(this.myText);                    
                    var tempStr = this.myText.replace(regExp, '')
                    this.myText = tempStr
                    var imageurl = result
                    this.imageurl = imageurl;
                }

                if(this.myText.includes('youtu')) { 
                    var regExp = /\b((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/;
                    var result = regExp.exec(this.myText);
                    var tempStr = this.myText.replace(regExp, '')
                    this.myText = tempStr
                    var currVideoUrl = result[0]
                    regExp = /=(.*)/ 
                    this.videourl = currVideoUrl;
                    result = regExp.exec(currVideoUrl);
                    this.videourl = result[0].substring(1)
                }
                
            }
            
            this.newNote = {
                "id": createNoteId.makeId(8),
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
        myText(val) {
        if (val) {
            this.isTextActive = false
        }

    }


},
components: {
}

}

