// import noteList from  ''


export default {
    props:['note'],
    template: `
        <section class="shadow-drop-2-center keep-preview-container">
            <div class="keep-preview-title">{{note.title}}</div>
            <div class="keep-preview-txt">{{note.txt}}</div>
        </section>

    `,
    
    }